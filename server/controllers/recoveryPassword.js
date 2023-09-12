const models = require("../../database/models");
const { httpError, response } = require("../helpers/responses");
const { userNotFound } = require("../helpers/constants.js");
const bcrypt = require("bcryptjs");
const { sendPass } = require("../helpers/sendPass.js");

const updatePass = async (req, res) => {
    try {

     const { body } = req;
     
     var generator = require("generate-password");

     var password = generator.generate({
       length: 10,
       uppercase: true,
       symbols: true,
       numbers: true
      });

      const encPass = bcrypt.hashSync(password)

      const validateUser = await models.users.findOne({
        where: {
          email: body.email,
          statusDelete: false,
        },
      });
  
      if (!validateUser) return res.status(404).send(response(userNotFound));

      validateUser.update({
        password: encPass,
      });

      await sendPass(password,validateUser.email, "Restauración de Contraseña")
  
      return res.status(200).send("Recovered Password");
    } catch (error) {
      httpError(res, error);
    }
  };

  module.exports = {
    updatePass,    
  };