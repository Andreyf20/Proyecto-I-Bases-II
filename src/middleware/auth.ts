const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`,
  }),

  audience: process.env.AUTH0_AUDIENCE,
  issuer: `${process.env.AUTH0_ISSUER}`,
  algorithms: ["RS256"],
});

export async function generateAuthToken(user) {
  const token = await axios.post(
    `${process.env.AUTH0_ISSUER}oauth/token`,
    {
      _id: 1,
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      grant_type: "client_credentials",
    },
    { "content-type": "application/json" }
  );

  return token.data.access_token;
}

export async function getUserFromPayload(req, res, next) {
  try {
    if (!req.user._id) throw new Error("User not found");

    const user = {
      _id: 2,
      nombre: "Mauricio",
    }; //TODO Quitar esto, remplazar por .findOne() con el _id del payload

    user["_id"] = req.user._id; //Ejemplo de como se obtiene el id del usuario

    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}
