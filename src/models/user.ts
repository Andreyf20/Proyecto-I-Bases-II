const mongoose = require('mongoose')
const validator = require('validator')
const bycript = require('bcryptjs')
import {generateAuthToken} from '../middleware/auth'

const userSchema = new mongoose.Schema( {
        name : {
            type : String,
            required : [true, "User's name is required"]
        },

        email : {
            type : String,
            required : [true, "User's e-mail is required"],
            trim : true,
            lowercase : true,
            unique : true, 
            validate(value) {

                if(!validator.isEmail(value))
                    throw new Error('Email is invalid')
            }
        },

        age : {
            type : Number,

            validate(value){ 
                if(value < 0)
                    throw new Error("Age most be positive number")
            }
        },

        password : {
            type : String,
            required : [true, "Must specify a password"],
            trim : true,
            minlength : [7, "Password must be at least length 7"],
            validate(value) {
                if(value.toLowerCase().includes("password"))
                    throw new Error("Password cannot contain the word 'password'")
            }
        },

        tokens : [{
            token : {
                type : String,
                required : true
            }
        }]

    }, 
    {
     timestamps : true
    })

userSchema.statics.findByCredentials = async (email, password)=> {
    const user = await User.findOne({email})

    if(!user)
        throw new Error("Incorrect email or password")
    
    const isMatch = await bycript.compare(password, user.password)

    if(!isMatch)
        throw new Error("Incorrect email or password")

    return user
}

userSchema.methods.toJSON = function() {
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens

    return userObj
}

userSchema.methods.newAuthToken = async function(){
    const user = this
    const token = await generateAuthToken(user)

    user.tokens = user.tokens.concat({token})
    await user.save() 

    return token
}

//Hash user password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified("password"))
        user.password = await bycript.hash(user.password, 8)


    next()
} )

const User = mongoose.model("User", userSchema)


module.exports = User