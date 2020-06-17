const mongoose = require('mongoose')
const validator = require('validator')

const productSchema= new mongoose.Schema({

    name:{
        type : String,
        required : [true, "Product's name is required"]
    },
    quantity: {
        type : Number,
        required : [true, "Quantity is required"]
    },
    code: {
        type : Number,
        required : [true, "Code name is required"]
    },
    producer:{
        type : String,
        required : [true, "Producer name is required"]
    },
    zone:{
        type : Number,
        required : [true, "Zone number is required"]
    },
    price:{
        type : Number,
        required : [true, "Price is required"]
    }
});
