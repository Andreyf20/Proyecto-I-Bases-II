import { env } from "process";

import {generateAuthToken } from "../middleware/auth";

const getProvincia = require('./distance.ts');

const express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const Product = require("../models/producto");
const Usuario = require("../models/user");
const authenticationEnabled = false;

var dbConfig = {
  url: env["MONGO_URL"],
  user: env["MONGO_USER"],
  pwd: env["MONGO_PWD"],
};

function getConnection() {
  if (
    dbConfig.user !== "NULL" &&
    dbConfig.pwd !== "NULL" &&
    authenticationEnabled
  ) {
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
  } else {
    mongoose
      .connect(dbConfig.url, {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("successfully connected to the database");
      })
      .catch(() => {
        console.log("error connecting to the database");
      });
  }
}

getConnection();

// router.get("/", async (req, res, next) => {
//   res.send("ROOT DIR");
//   next();
// });

router.post("/agregarProducto", async (req, res, next) => {
  const newProductJson = req.body.producto;
  // TODO: validar con el lint
  console.log(newProductJson);
  const newProduct = new Product({
    nombre: newProductJson.nombre,
    cantidad: newProductJson.cantidad,
    codigo: newProductJson.codigo,
    productor: newProductJson.productor,
    provincia: newProductJson.provincia,
    precio: newProductJson.precio,
    enabled: 1,
  });

  newProduct
    .save()
    .then(() => {
      res.status(200).json(newProduct);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    })
    .finally(() => {
      next();
    });
});

router.get("/Productos", async (req, res, next) => {
  // TODO: valiadar los tokens??
  Product.find()
    .exec()
    .then((prod) => {
      res.status(200).json(prod);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    })
    .finally(() => {
      next();
    });
});

router.get('/login', async (req, res)=> {
  try {
    var token = await generateAuthToken(null);
    res.send({token : token.data.access_token})
      
  } catch (error) {
    res.send(error)
  }   
})


router.get("/Productos/:lon/:lat", async (req, res, next) => {
  // TODO: valiadar los tokens??
  const lon = req.params.lon;
  const lat = req.params.lat;

  var provincia = getProvincia([lon, lat]);
  console.log("Provincia: " + provincia + " Lon: " + lon + " Lat: " + lat);
  Product.find()
    .where("provincia")
    .in(provincia)
    .exec()
    .then((prod) => {
      res.status(200).json(prod);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    })
    .finally(() => {
      next();
    });
});

export = router;
