const { check,validator } = require("express-validator");
const { validateResult } = require("../helpers/validators");

const validMovement = [
    check("description")
      .not()
      .isEmpty()
      .withMessage("Description require"),
      
    check("movementDate")
      .if((value, { req }) => req.body.typeMov !== "ahorro")
      .not()
      .isEmpty()
      .withMessage("Date require"),
      
    check("amount")
      .not()
      .isEmpty()
      .withMessage("Amount require"),
  
    check("concept")
      .if((value, { req }) => req.body.typeMov !== "ahorro")
      .not()
      .isEmpty()
      .withMessage("Concept require"),

    check("account")
      .not()
      .isEmpty()
      .withMessage("Account require"),

    check("typeMov")
      .not()
      .isEmpty()
      .withMessage("Type movement require"),

    check("goal")
      .if((value, { req }) => req.body.typeMov === "ahorro")
      .not()
      .isEmpty()
      .withMessage("Type movement require"),
  
    (req, res, next) => {
      validateResult(req, res, next);
    },
  ];
  
  
  
  module.exports = { validMovement};