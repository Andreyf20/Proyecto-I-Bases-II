const mongoose = require("mongoose");

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
  },
  { collection: "productos" }
);

const Producto = mongoose.model("Producto", ProductoSchema);

module.exports = Producto;
