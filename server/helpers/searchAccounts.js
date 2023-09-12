const models = require("../../database/models");
const { httpError} = require("../helpers/responses");
const {Op} = require("sequelize");

const searchAc = async (model,data,userId,res) => {
    try {
        let pag = 0;
    //   if(!Number.isNaN(data.page) && data.page > 0){
    //     pag = data.page;
    //   }
      let size = 10;
    //   if(!Number.isNaN(data.pageSize) && !(data.pageSize > 10) && !(data.pageSize < 1)){
    //     size = data.pageSize;
    //   }
        const getAccounts = await models[model].findAll({
          where: {
            userId: userId,
            statusDelete: false,
          },
          limit: size,
          offset: pag * size,
          attributes: ['name', 'typeAccount', 'balance', 'publicKey','cutoffDate'],
        });
    
        return res.status(200).send(getAccounts);
    } catch (error) {
        httpError(res,error);
    }
};
 
module.exports = { 
    searchAc,
  
};