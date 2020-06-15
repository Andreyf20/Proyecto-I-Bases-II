const jwt = require('jsonwebtoken')
const expjwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
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
                                      {
                                        audience:  process.env.AUTH0_AUDIENCE,
                                        issuer: process.env.AUTH0_ISSUER
                                      })
  //TODO save token to user
  return token;
}
