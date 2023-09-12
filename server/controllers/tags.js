const models = require("../../database/models");
const { httpError, response } = require("../helpers/responses");
const { body } = require("express-validator");

//EP to add tag
const addTag = async (req, res) => {
  try {
    
    const { body } = req;
    const validateTag = await models.concepts.findOne({
      where: {
        userId: req.user.id,
        description: body.description,        
      }
    });

    if (validateTag){
      return res.status(401).send("Tag exists")
    }

    const getColor = await models.resources.findOne({
      where: {
        color: body.color,
        statusDelete: false,
      },
    });

    const validateColor = await models.conceptsResources.findAll({
      where: {
        resourceId: getColor.id,
      },
      include: [{
        model: models.concepts, as:'concepts',
        where:{
          userId: req.user.id
        }
       }]
    })

   
    if (validateColor!=0){
      return res.status(401).send("Color exists, choose another color");
    }

    const tag = await models.concepts.create({
      description: body.description,
      type: body.type,
      classification: body.classification,
      userId: req.user.id,
    });
    
    await models.conceptsResources.create({
      conceptId: tag.id,
      resourceId: getColor.id
    });

    return res.status(201).send("Tag created succesfully");
  } catch (error) {
    httpError(res, error);
  }
};


module.exports = {
  addTag
};