const models = require("../../database/models");
const { httpError} = require("../helpers/responses");
const {Op, ENUM} = require("sequelize");
const concepts = require("../../database/models/concepts");



const searchConcepts = async (model,data,body,userId,res) => {
    try {
        //filtro de descriocción
    if(data.filter==="description"){
        //string de búsqueda
        console.log("entro a description")
           
        // encontrar en el modelo concepts todos los concepts cuya descripicón sea igual a la que se proporciona por el cliente    
        const search = await models[model].findAll({
            include: [
                {model: models.users, as:'users', where: {id: userId,statusDelete: false}, attributes:{exclude:['email','password']}}// 
              ],
            where: {description: {
                        [Op.substring]: body.word
                    }
                },
  
         
        
        });
        
        if(search.length===0){
            return res.status(404).send("No concepts as searched was found");
        }
        return res.status(200).send(search);
    } else if(data.filter==concepts.type){
        const search = await models[model].findAll({
            include: [
                {model: models.users, as:'users', where: {id: userId,statusDelete: false}, attributes:{exclude:['email','password']}}// 
              ],
            where: {type: {
                [Op.in]:['egreso','ingreso']
            }
        },
    
        });
        if(search.length===0){
            return res.status(404).send("No types as searched was found");
        }
        return res.status(200).send(search);
    }
    else if(data.filter==concepts.classification){
        console.log("entro a classification")
        const search = await models[model].findAll({
            include: [
                {model: models.users, as:'users', where: {id: userId,statusDelete: false},attributes:{exclude:['password','email']},}// 
              ],
              
            where: {classification: {
                [Op.in]:['fijo ','variable']
            }
        },

        
        });
        if(search.length===0){
            return res.status(404).send("No classification as searched was found");
        }
        return res.status(200).send(search);
    }
    else if(data.filter==="color"){

        const search = await models[model].findAll({
            include: [
              {model: models.users, as:'users', where: {id: userId,statusDelete: false},attributes:{exclude:['password','email']}}, 
              {model: models.resources, as:'conceptos',where: {color: {[Op.substring]: body.word},
            },attributes:['color']}],
 
  
         
     
        });
        if(search.length===0){
            return res.status(404).send("No color as searched was found");
        }
        return res.status(200).send(search);
    }
      
    } catch (error) {
      httpError(res,error);
    }
  };

module.exports = { 
    searchConcepts 
};