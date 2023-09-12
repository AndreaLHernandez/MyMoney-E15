const { check,validator } = require("express-validator");
const { validateResult } = require("../helpers/validators");

const validChangePassword = [
    check("newPassword" && "confirmnewPassword")
      .not()
      .isEmpty()
      .withMessage("new password require")
      .isLength({min:6, max:20})
      .withMessage("Password lenght must be between 6-20")
      .matches(/\W/)
      .withMessage("Special character required")
      .matches(/[A-Z]/)
      .withMessage("Mayus required")
      .matches(/[0-9]/)
      .withMessage("Number required"),
      (req, res, next) => {
        validateResult(req, res, next);
      }
    ];
  
  
  module.exports = { validChangePassword };