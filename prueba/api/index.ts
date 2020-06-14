const { prisma } = require('../generated/prisma-client')
var express = require('express');
var router = express.Router();

/*const newProduct=await prisma.createProducto({cantidad:15,codigo:17,enabled:1,provincia:2,nombre:"Prueba3",precio:50})

const allProducts=await prisma.productoes();
console.log(allProducts)*/

router.get('/', async ()=> { })

router.get('/productos', async (req, res)=> {
  const allProducts=await prisma.productoes();
  res.send(allProducts)
})

module.exports = router;