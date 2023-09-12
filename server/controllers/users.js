const models = require("../../database/models");
const { httpError, response } = require("../helpers/responses");
const { userNotFound, userDeleted } = require("../helpers/constants.js");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../helpers/sendemail");
const jwt = require("jsonwebtoken");
const{
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_TIME,
  JWT_REFRESH_TIME,
  URL_FRONTEND
}= require ("../../config/config");


// EP to get all users
const getUsers = async (req, res) => {
  try {
    const getAllUsers = await models.users.findAll({
      where: {
        statusDelete: false,
      },
    });

    return res.status(200).send(getAllUsers);
  } catch (error) {
    httpError(res, error);
  }
};

// EP to get user by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const getUser = await models.users.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!getUser) return res.status(404).send(response(userNotFound));

    return res.status(200).send(getUser);
  } catch (error) {
    httpError(res, error);
  }
};

//EP to add user
const addUser = async (req, res) => {
  try {
    const { body } = req;
    const validateEmail = await models.users.findOne({
      where: {
        email: body.email
      }
    });
      
    if (validateEmail){
      return res.status(401).send("Email exists")
    }

    //Encriptar contraseña
    const encPass = bcrypt.hashSync(body.password)
    const user = await models.users.create({
      email: body.email,
      password: encPass
    });
    
    const intentos = await models.failedAttempts.create({
      attempt: 0,
      userId: user.id
    });
    //Crear token de autenticación 
    const emailToken = jwt.sign({ user: user }, JWT_ACCESS_SECRET, {
      expiresIn: JWT_ACCESS_TIME,
    });
    
   //Mandar correo de confirmación
   await sendEmail(emailToken, user.email, "Activación de Cuenta")
   
   return res.status(201).send("User created succesfully");
    
  } catch (error) {
    console.log(error);
    httpError(res, error);
  }
};


//Ed to update user
const updateUser = async (req, res) => {
  try {
    const { body } = req;

    const user = await models.users.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!user) return res.status(404).send(response(userNotFound));

    user.update({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
    });

    return res.status(200).send(user);
  } catch (error) {
    httpError(res, error);
  }
};

//EP to "delete" user in this case is soft delete, change the value statusDelete true
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await models.users.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!user) return res.status(404).send(response(userNotFound));

    user.update({
      statusDelete: true,
    });

    return res.status(200).send(response(userDeleted));
  } catch (error) {
    httpError(res, error);
  }
};


module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser, 
  deleteUser,
};