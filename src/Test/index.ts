const mongoose_1 = require("mongoose");
var mongoose = new mongoose_1.Mongoose();
var dbConfig = {
  url: "mongodb://25.97.193.57:27025/Productos?authSource=Productos",
  user: "psy",
  pwd: "$2y$07$qmbH7zdDk7BauXUK1BPqae6DKFiw2juoLhJ3cMkfv.ppoOUzaKcre",
};
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    user: dbConfig.user,
    pass: dbConfig.pwd,
  })
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch(() => {
    console.log("error connecting to the database");
  });
//datamodel
const ProductoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Product's name is required"],
    },
    cantidad: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    codigo: {
      type: Number,
      required: [true, "Code name is required"],
    },
    productor: {
      type: String,
      required: [true, "Producer name is required"],
    },
    provincia: {
      type: Number,
      required: [true, "Zone number is required"],
    },
    precio: {
      type: Number,
      required: [true, "Price is required"],
    },
    enabled: {
      type: Number,
      required: [true, "Enabled is required"],
    },
  },
  {
    versionKey: false,
  }
);

//escritura

const Producto = mongoose.model("Producto", ProductoSchema);

var productoNuevo = new Producto({
  nombre: "Limón",
  cantidad: 5,
  codigo: 21,
  productor: "Andrey",
  provincia: 0,
  precio: 506,
  enabled: 1,
});

productoNuevo.save().then((err) => {
  if (err) return console.error(err);
  console.log("Producto agregado.");
});

Producto.find().then((err, prod) => {
  if (err) return console.error(err);
  console.log(prod);
});
