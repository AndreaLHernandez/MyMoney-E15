const models = require("../../database/models");
const randtoken = require('rand-token');
const jwt = require('jsonwebtoken');
const { httpError, response } = require("../helpers/responses");
const bcrypt = require("bcryptjs");
const{
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_TIME,
  JWT_REFRESH_TIME,
}= require ("../../config/config");
const {validChangePassword} = require("../validators/login");

const userLogin = async (req,res)=>{
    try {
      const {body} = req;
      
      const activo = await models.users.findOne({
  
        where:{
          email: body.email,
          statusAct: false //para realizar pruebas cambiarlo a false, true temporal
        },
      });
      if(activo){
        return res.status(401).send('User blocked or not activated please check your email');
      }
      
      const user = await models.users.findOne({
  
        where:{
          email: body.email,
          statusAct: true
        },
      });
     
      if(!user){
        return res.status(404).send('Wrong email or password please verify');
      }
      const validate = await bcrypt.compareSync(body.password, user.password);
      delete user.dataValues.password;
     //Intentos de login

     const  numIntentos= await models.failedAttempts.findOne({
        where:{
          userId: user.id,
        },
      });
      const now = new Date()
      if(!validate){
        if(numIntentos.dateLogin){
          if(numIntentos.dateLogin < now){
            numIntentos.update({
              attempt:numIntentos.attempt+1
              });

          }
        }else{ 
          numIntentos.update({
          attempt:1,
          dateLogin: now
          });
          
        }
      if(numIntentos.attempt >=3){
        user.update({
          statusAct:false
          });
      }
  
        return res.status(404).send('Wrong email or password please verify');
  
      }
      //Se logueo correctamente
      numIntentos.update({
        attempt:0,
        dateLogin:null
        });


      //refreshtoken
      let refreshtoken = randtoken.generate(16);
      const locateSessions = await models.sessions.findOne({
       
        where: {
          userId: user.id,
          status:true
        },
      });
      
      if(!locateSessions){
        await models.sessions.create({
          refreshToken:refreshtoken,
          userId: user.id,
          status:true
          
      });
      
    }else{
     await locateSessions.update({
        refreshtoken
      });
    }
   
        const accessToken = jwt.sign({user:user},JWT_ACCESS_SECRET,{
          expiresIn:JWT_ACCESS_TIME,
        });
  
       
       refreshtoken =jwt.sign(
          {refreshToken:refreshtoken,user:user},
          JWT_REFRESH_SECRET,
          {
            expiresIn:JWT_REFRESH_TIME,
          }
        ); 
       
      return res.status(200).send({accessToken,refreshtoken});
    } catch (error) {
      return httpError(res,error);
    }
  };
  
  const createAccesToken = async (req, res)=>{
       try {
          let {refreshToken} = req.body
          let jwtPayload = jwt.verify(refreshToken,JWT_REFRESH_SECRET);
          const sesion= await models.sessions.findOne({
            where: {
              refreshToken: jwtPayload.refreshToken
            }
            //existe el usuario 
          }); 
          let token = randtoken.generate(16)
          const accessToken = jwt.sign({user:jwtPayload.user},JWT_ACCESS_SECRET,{
            expiresIn:JWT_ACCESS_TIME,
          
            
          });
          
           refreshToken =jwt.sign(
            {refreshToken:token,user:jwtPayload.user},
            JWT_REFRESH_SECRET,
            {
              expiresIn:JWT_REFRESH_TIME,
            }
          
        );
        return res.status(200).send({accessToken,refreshToken})
     
      } catch (error) {
        
         return res.status(400).send("Invalid Token")
       }
      }
      const  changePassword = async (req, res) => {
  
        try {
          
          const { body } = req;

          const {oldPassword, newPassword,confirmnewPassword} = req.body;
          
          if( newPassword !== confirmnewPassword ){
            return res.status(400).send("password does not match");
          }
          const user = await models.users.findOne({
            where: {
              id: req.user.id,
              statusDelete: false,
            }
          }); 
          if (!user) return res.status(404).send("User does not exist");
          let passwordHash = await bcrypt.hash(newPassword,8)
          
          user.update({
            password: passwordHash,
      
          });
          return res.status(200).send("updated password");
        } catch (error) {
          httpError(res, error);
        }
      };
      module.exports = {
        userLogin,
        createAccesToken,
        changePassword
      };