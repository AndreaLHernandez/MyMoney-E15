const models = require("../../database/models");
const { httpError} = require("../helpers/responses");
const {Op} = require("sequelize");
const movements = require("../../database/models/movements");


const searchAccBalance = async (model,data,userId,res) => {
    try {
    if(data.filter==="year"||data.filter==="month"||data.filter==="week"||data.filter==="day"){
            const iDate = data.iDate;
            const fDate = data.fDate;
            console.log(iDate,fDate);
        const search = await models[model].findAll({
            attributes:['userId','name','numberAccount'],
            include: 
                {
                    model: movements,
                    attributes: ['typeMov'[sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']],
                    group:['typeMov']
                },
            where: {statusDelete: false, 
                    typeMov: data.typeMov,
                    movementDate: {
                        [Op.and]: {
                            [Op.gte]: iDate,
                            [Op.lte]: fDate
                        }
                    }
                }
        });
        
        if(search.length===0){
            return res.status(404).send("No balances found");
        }
        return res.status(200).send(search);
    }else if(data.filter==="typeMov"){
        const regex = new RegExp(termino,'i');
        console.log(data,model,userId,termino);
        const search = await models[model].findAll({
            attributes:['userId','typeAccount','typeAccount','numberAccount'],
            include: 
                {
                    model: movements,
                    attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']],
                    group:['typeMov']
                },
            where: {statusDelete: false, 
                    typeMov: {
                        [Op.eq]: data.regex
                    }
                }
        
        });
        if(search.length===0){
            return res.status(404).send("No balances as searched was found");
        }
        return res.status(200).send(search);
    }
      
    } catch (error) {
      httpError(res,error);
    }
  };

module.exports = { 
    searchAccBalance 
};