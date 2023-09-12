const models = require("../../database/models");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET } = require ("../../config/config");


//Confirmar Correo
const confirm = async (req, res) => {
    try { 
        // Obtener el token
        const params = req.params;
        
        // Verificar la data
        let decoded = await jwt.verify(params.token, JWT_ACCESS_SECRET);
        
        const user = await models.users.findOne({
            where: {
                email:decoded.user.email
            }
        });
        
        if(!user) {
            return res.status(400).send("User not found");
        }
  
        // Actualizar usuario
        user.update({
          statusAct: true,
        });
        
        
        // Redireccionar a la confirmación
        return res.status(200).send("User actived succesfully");
  //      return res.redirect('/confirm.html');
         
     } catch (error) {
         return res.status(400).send("Invalid token");
    }
  }

  module.exports = {
    confirm,
  };
  