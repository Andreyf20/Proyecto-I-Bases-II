import { checkJwt, getUserFromPayload } from "../middleware/auth";
const express = require('express');
var router = express.Router();
var jwt = require('../middleware/auth')

/*const newProduct=await prisma.createProducto({cantidad:15,codigo:17,enabled:1,provincia:2,nombre:"Prueba3",precio:50})

const allProducts=await prisma.productoes();
console.log(allProducts)*/

router.get('/', async ()=> { 
  //TODO 
})

router.get('/login',checkJwt, getUserFromPayload,async (req, res)=> {
  try {
    
    const user = req.user
    //TODO Quitar esto, remplazar por .findByCredentials()
    const token = await jwt.generateAuthToken(user)

    res.send({user,token})
  } 
  
  catch (error) {
    res.status(500).send({error : 'Server error :/',
                          message : error.message
                        });
  }

})

export = router;