const models = require("../../database/models");
const { httpError, response } = require("../helpers/responses");
const { searchDate} = require("../helpers/searchMov.js")
const { searchConcepts} = require("../helpers/searchConcepts2.js")
//const { searchAccBalance} = require("../helpers/searchAccBalance.js")
const { searchMo} = require("../helpers/searchMov.js");
const { searchG} = require("../helpers/searchGoal.js")
const { searchAc} = require("../helpers/searchAccounts.js")
const {Op} = require("sequelize");

const coleccionesPermitidas= ["movements", "goals","concepts","accounts"];
const getSearch = async (req, res) => {
    
    try {
        const data = req.query;
        const model= req.params.model;
        const userId = req.user.id;
        const body = req.body;
        
        if(!coleccionesPermitidas.includes(model)){
            return res.status(400).send("Model not allowed");
        }else{ 
            
            switch (model) {
                case "movements":
                    searchMo(model,data,userId,res)
                    break;
                case "goals":
                    searchG(model,data,userId,res)
                    break;
                case "concepts":
                    searchConcepts(model,data,body,userId,res)
                        break;
                case "accounts":
                    searchAc(model,data,userId,res)
                                break;
                default:
                    break;
            }
        }  
    } catch (error) {
      httpError(res, error);
    }
  };
 

module.exports = { 
    getSearch,
  
};