const models = require("../../database/models");
const { httpError, response } = require("../helpers/responses");
const accounts = require("../../database/models/accounts");
const concepts = require("../../database/models/concepts");
const movements = require("../../database/models/movements");
const resources = require("../../database/models/resources");
const movementresources = require("../../database/models/movementresources");
const { body } = require("express-validator");
const { uploadImage } = require("../helpers/upload");
const { accountNotFound, accountDeleted} = require("../helpers/constants.js");
const { URL_HEROKU } = require("../../config/config");

const addMovement = async (req, res) => {

    try{

      const { body } = req;
      
      const getAccount = await models.accounts.findOne({
            where: {
                numberAccount: body.account,
                userId: req.user.id
            }});
      if(!getAccount) return res.status(404).send(accountNotFound);

        if(body.typeMov==="ahorro"){
          if(getAccount.balance >= body.amount){
               await models.movements.create({
               description: "cargo ahorro",
               amount: body.amount,
               movementDate: new Date(),
               accountId:getAccount.id,
               typeMov: "egreso",
               statusDelete:false,

           });
            getAccount.update({
            balance: number(getAccount.balance)-number(body.amount),
           });

           const getGoal = await models.goals.findOne({
             where: {
                 userId:req.user.id,
                 description: body.goal
             }
           });
           let getAhorro = await models.accounts.findOne({
            where: {
                numberAccount: "1"
            }
          });
          if(!getAhorro){
            getAhorro = await models.accounts.create({
              name: "Cta Ahorros",
              typeAccount: "ahorro",
              numberAccount: 1,
              balance: 0,
              userId: req.user.id
            });
          }
           const movement = await models.movements.create({ 
             movementDate: new Date(),
             amount:body.amount,
             goalId:getGoal.id,
             description: body.description,
             accountId:getAhorro.id,
             typeMov: body.typeMov,
             statusDelete:false,
           });
           
           await models.movementResources.create({
            movementId: movement.id,
            resourceId: getGoal.id
           });
  
        return res.status(201).send("movement created succesfully"); 
          }else{
            return res.status(400).send("No cuenta con fondos suficientes para hacer la operación");
          }

        }else if(body.typeMov==="egreso"||body.typeMov==="ingreso"){
        const getConcept = await models.concepts.findOne({
            where: {
                description: body.concept,
                type: body.typeMov,
                userId: req.user.id
            }   
        }); 
        if(!getConcept) return res.status(404).send("Concept not found");
    
        let imag=null;
        let movement=null;
        if(body.typeMov=== "egreso"){
          console.log("Entro a egreso");
          if(getAccount.balance >= body.amount){
            if (body.image!= null) {
              imag = await uploadImage(body.image,"/profiles");
              console.log("Creo link imagen");
              console.log(imag);
            }
              movement = await models.movements.create({
              description: body.description,
              movementDate: body.movementDate,
              amount: body.amount,
              conceptId:getConcept.id,
              accountId:getAccount.id,
              image:imag,
              typeMov: body.typeMov,
              statusDelete:false,
          });
          getAccount.update({
            balance: Number(getAccount.balance)-Number(body.amount),
           });
          }else{
            return res.status(400).send("Balance isn't enough");
          }
          
          
        }if(body.typeMov=== "ingreso"){
          
            movement = await models.movements.create({
            description: body.description,
            movementDate: body.movementDate,
            amount: body.amount,
            conceptId:getConcept.id,
            accountId:getAccount.id,
            image:imag,
            typeMov: body.typeMov,
            statusDelete:false,
        });
          getAccount.update({
            balance: Number(getAccount.balance)+Number(body.amount),
           });
        }
        
    
        await models.movementResources.create({
          movementId: movement.id,
          resourceId: getConcept.id
      });

      return res.status(201).send("movement created succesfully"); 
      }
      } catch (error) {
        httpError(res, error);
    }       
       
};


  const deleteMovements = async (req, res) => {
    try {
      const { id} = req.query;
      
      const movement = await models.movements.findOne({
        where: {
          id,
          statusDelete: false,
        },
        include: [
          {model: models.accounts,
          as:'accounts', where: {userId: req.user.id, statusDelete: false}},
        ],

      });
  
      if (!movement) return res.status(404).send("movement not found");
      movement.update({
        statusDelete: true,
      });
  
      return res.status(200).send("movement delete");
    } catch (error) {
      httpError(res, error);
    }
  };
  
module.exports = {
    addMovement,
    deleteMovements
};