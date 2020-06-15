const jwt = require('jsonwebtoken')


export async function generateAuthToken(user) {
  const token = jwt.sign({_id : user._id.toString()}, "lonnis")

  return token;
}
