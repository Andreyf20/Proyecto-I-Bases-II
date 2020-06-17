import { checkJwt, getUserFromPayload, generateAuthToken } from "../middleware/auth";
const express = require('express');
var router = express.Router();

/*const newProduct=await prisma.createProducto({cantidad:15,codigo:17,enabled:1,provincia:2,nombre:"Prueba3",precio:50})

const allProducts=await prisma.productoes();
console.log(allProducts)*/

router.get('/', async ()=> { 
  //TODO 
})

router.get('/login', async (req, res)=> {
  try {
    var token = await generateAuthToken(null);
    res.send({token : token.data.access_token})
      
  } catch (error) {
    res.send(error)
  }   
})

export = router;