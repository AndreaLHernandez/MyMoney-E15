const jwt = require("jsonwebtoken");
const{
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_TIME,
    JWT_REFRESH_TIME,
  }= require ("../../config/config");



const checkJwt = async (req, res, next) =>{

    try {
     let token = req.get("Authorization");
     token = token.split(" ");
     let jwtPayload = jwt.verify(token[1],JWT_ACCESS_SECRET);
        req.user = jwtPayload.user;
    next();
    }catch (error){
      return res.status(401).send("Token invalido");
    }
    
};
module.exports = {checkJwt};
