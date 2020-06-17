import { checkJwt, getUserFromPayload } from "../middleware/auth";
const express = require('express');
var router = express.Router();

/*const newProduct=await prisma.createProducto({cantidad:15,codigo:17,enabled:1,provincia:2,nombre:"Prueba3",precio:50})

const allProducts=await prisma.productoes();
console.log(allProducts)*/

router.get('/', async ()=> { 
  //TODO 
})

router.get('/login',checkJwt, getUserFromPayload,async (req, res)=> {
  try {
    const user = req.user // TODO Uncomment await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.newAuthToken()

    res.send({user,token})
  } 
  
  catch (error) {
    res.status(500).send({error : 'Server error :/',
                          message : error.message
                        });
  }

})

export = router;