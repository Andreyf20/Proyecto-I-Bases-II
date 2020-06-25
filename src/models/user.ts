const mongoose = require('mongoose');
const validator = require('validator');
const bycript = require('bcryptjs');
import { generateAuthToken } from '../middleware/auth';

const UsuariosSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "User's name is required"],
    },

    email: {
      type: String,
      required: [true, "User's e-mail is required"],
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error('Email is invalid');
      },
    },

    cumpleaños: {
      type: Date,
    },

    contraseña: {
      type: String,
      required: [true, 'Must specify a password'],
      trim: true,
      minlength: [4, 'Password must be at least length 7'],
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },

  { collection: 'usuarios', versionKey: false },
  {
    timestamps: true,
  }
);

UsuariosSchema.statics.findByCredentials = async (email, password) => {
  const user = await Usuario.find().where('email').in(email).exec();

  if (!user) throw new Error('Incorrect email or password');

  const isMatch = password === user[0]['contraseña'];
  if (!isMatch) throw new Error('Incorrect email or password');

  return user[0];
};

UsuariosSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.contraseña;
  delete userObj.tokens;
  return userObj;
};

UsuariosSchema.methods.newAuthToken = async function () {
  try {
    const user = this;
    const token = await generateAuthToken(user);

    user.tokens.push({ token: token });

    await user.save();

    return token;
  } catch (err) {
    console.log(err);
  }
};

//Hash user password before saving
UsuariosSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('contraseña')) user['contraseña'] = await bycript.hash(user['contraseña'], 7);

  next();
});

const Usuario = mongoose.model('Usuario', UsuariosSchema);

module.exports = Usuario;
