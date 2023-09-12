const models = require("../../database/models");
const { httpError, response } = require("../helpers/responses");
const { body } = require("express-validator");
const moment = require('moment');

//EP to add tag
const addGoal = async (req, res) => {
  try {
    
    const { body } = req;
    const validateGoal = await models.goals.findOne({
      where: {
        userId: req.user.id,
        description: body.description,        
      }
    });

    //console.log(validateGoal);

    if (validateGoal){
      return res.status(401).send("Goal exists")
    }

    const getColor = await models.resources.findOne({
      where: {
        color: body.color,
        statusDelete: false,
      },
    });

   // console.log(getColor);

    const validateColor = await models.goalsResources.findAll({
        where: {
          resourceId: getColor.id,
        },
        include: [{
          model: models.goals, as:'goals',
          where:{
            userId: req.user.id
          }
         }]
      })

     // console.log(validateColor);
  
     
    if (validateColor!=0){
        return res.status(401).send("Color exists, choose another color");
    }
    
    //--------Cálculo de Total---------
    var startDate = moment(body.startDate);
    var endDate = moment(body.endDate);
    let weeks,total,months;
    if (body.period==="semanal") {
        weeks = endDate.diff(startDate, 'weeks'); ///para semanas completas con decimales usar true
        total = (weeks*body.amount)
    }
    if (body.period==="quincenal") {
        weeks = endDate.diff(startDate, 'weeks'); ///para semanas completas con decimales usar true
        total = ((weeks/2)*body.amount)
    }
    if (body.period==="mensual") {
       months = endDate.diff(startDate, 'months'); ///para meses completos con decimales usar true
       total = (months*body.amount)
    }
    
    //---------------------------------

    const goal = await models.goals.create({
      description: body.description,
      startDate: body.startDate,
      endDate: body.endDate,
      amount: body.amount,
      period: body.period,
      total: total,///definir con operación
      userId: req.user.id,
    });
    
    await models.goalsResources.create({
      goalId: goal.id,
      resourceId: getColor.id
    });

    return res.status(201).send("Goal created succesfully");
  } catch (error) {
    httpError(res, error);
  }
};


module.exports = {
  addGoal
};