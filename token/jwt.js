const jwt= require("jsonwebtoken");

let JWT_SECRET_KEY = "prithivi_023qwerty"; 

//token generate process
async function createToken(payload){

   return jwt.sign(payload, JWT_SECRET_KEY,{
        expiresIn:'1d'
    });
}
async function verifyToken(token){
    return jwt.verify(token,JWT_SECRET_KEY);
}

module.exports={createToken,verifyToken};