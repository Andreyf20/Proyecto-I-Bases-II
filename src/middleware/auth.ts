const jwt = require('jsonwebtoken')
const expjwt = require("express-jwt");
const dotenv = require("dotenv");

dotenv.config();

export const checkJwt = expjwt({
      secret: process.env.AUTH0_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER,
      algorithms: ["HS256"]
    });

export async function generateAuthToken(user) {
  const token = jwt.sign({_id : user._id.toString()}, process.env.AUTH0_SECRET,
                                      {audience:  process.env.AUTH0_AUDIENCE,
                                        issuer: process.env.AUTH0_ISSUER
                                      })
  return token;
}

export async function getUserFromPayload(req,res,next){
  try {
    if(!req.user._id)
      throw new Error("User not found")

    const user = {
      _id : 2,
      nombre : "Mauricio"
    } //TODO Quitar esto, remplazar por .findOne() con el _id del payload 
    
    user['_id'] = req.user._id //Ejemplo de como se obtiene el id del usuario

    req.user = user

    next()
  } 
  
  catch (error) {
    res.status(401).send({error : error.message})
  }
}
