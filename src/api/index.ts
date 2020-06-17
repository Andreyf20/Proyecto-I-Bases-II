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

//getConnection();

router.get("/", async (req, res, next) => {
  res.send("ROOT DIR");
  next();
});

router.post("/agregarProducto", async (req, res, next) => {
  const newProduct = req.body.producto;
  // TODO: validar con el lint
  console.log(newProduct);
  res.send("Product succesfully added");
  next();
});

router.get("/Productos", async (req, res, next) => {
  // TODO: valiadar los tokens??
  Product.find()
    .exec()
    .then((prod) => {
      // TODO: validar con el lint??
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
  const lon = req.params.lon;
  const lat = req.params.lat;

  var provincia = getProvincia([lon, lat]);
  console.log("Provincia: " + provincia + " Lon: " + lon + " Lat: " + lat);
  res.status(200);
  next();
});

export = router;
