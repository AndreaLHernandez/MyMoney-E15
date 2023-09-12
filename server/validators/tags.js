const { check,validator } = require("express-validator");


const { validateResult } = require("../helpers/validators");


const validCreateUpTags = [
  check("description")
    .not()
    .isEmpty()
    .withMessage("Description require"),
    
  check("color")
    .not()
    .isEmpty()
    .withMessage("Color require"),
    
  check("type")
    .not()
    .isEmpty()
    .withMessage("Type Tag require"),

  check("classification")
    .not()
    .isEmpty()
    .withMessage("Classification require"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];



module.exports = { validCreateUpTags};