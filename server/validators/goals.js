const { check,validator } = require("express-validator");

const { validateResult } = require("../helpers/validators");

const validCreateUpGoals = [
  check("description")
    .not()
    .isEmpty()
    .withMessage("Description require"),
    
  check("startDate")
    .not()
    .isEmpty()
    .withMessage("Start Date require"),
    
  check("endDate")
    .not()
    .isEmpty()
    .withMessage("End Date require"),

  check("amount")
    .not()
    .isEmpty()
    .withMessage("Amount require"),

  check("period")
    .not()
    .isEmpty()
    .withMessage("Period require"),

  check("color")
    .not()
    .isEmpty()
    .withMessage("Color require"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validCreateUpGoals};