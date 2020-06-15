const { prisma } = require('../generated/prisma-client')
import express = require('express');
var router = express.Router();
var jwt = require('../middleware/auth')

/*const newProduct=await prisma.createProducto({cantidad:15,codigo:17,enabled:1,provincia:2,nombre:"Prueba3",precio:50})

const allProducts=await prisma.productoes();
console.log(allProducts)*/

router.get('/', async ()=> { })

router.get('/productos', async (req, res)=> {
  const allProducts=await prisma.productoes();
  res.send(allProducts)
})

router.get('/login', async (req, res)=> {
  try {
    const user = {
      _id : 1,
      nombre : "Mauricio"
      }

    const token = await jwt.generateAuthToken(user)

    res.send({user, token})
  } 
  
  catch (error) {
    res.status(500).send({error : error.message});
  }

})

export = router;