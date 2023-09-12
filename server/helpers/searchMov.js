const models = require("../../database/models");
const { httpError} = require("../helpers/responses");
const {Op} = require("sequelize");


const searchMo = async (model,data,userId,res) => {
    try {
    if(data.filter==="year"||data.filter==="month"||data.filter==="week"||data.filter==="day"){
            const iDate = data.iDate;
            const fDate = data.fDate;
         
        const search = await models[model].findAll({
            where: {statusDelete: false, 
                    typeMov: data.typeMov,
                    movementDate: {
                        [Op.and]: {
                            [Op.gte]: iDate,
                            [Op.lte]: fDate
                        }
                    }
                },
        include: [
            {model: models.accounts, as:'accounts', where: {userId: userId, statusDelete: false}},// 
          ],
        
        });
        
        if(search.length===0){
            return res.status(404).send("No moves found");
        }
        return res.status(200).send(search);
    }else if(data.filter==="tag"){
        const search = await models[model].findAll({
            where: {statusDelete: false, 
                    typeMov: data.typeMov,
                    
                },
        include: [
            {model: models.concepts, as:'concepts', where: {userId: userId, description:data.tTag}},// 
          ],
        
        });
        if(search.length===0){
            return res.status(404).send("No moves found");
        }
        return res.status(200).send(search);
    }
      
    } catch (error) {
      httpError(res,error);
    }
  };

module.exports = { 
    searchMo 
};