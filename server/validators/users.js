const { check,validator } = require("express-validator");

const {
  userPassRequired,
  userEmailRequired,
} = require("../helpers/constants");
const { validateResult } = require("../helpers/validators");


const validCreateUpUser = [
  check("password")
    .not()
    .isEmpty()
    .withMessage(userPassRequired)
    .isLength({min:6, max:20})
    .withMessage("Password lenght must be between 6-20")
    .matches(/\W/)
    .withMessage("Special character required")
    .matches(/[A-Z]/)
    .withMessage("Mayus required")
    .matches(/[0-9]/)
    .withMessage("Number required"),
  check("email")
    .not()
    .isEmpty()
    .withMessage(userEmailRequired)
    .isEmail()
    .withMessage("User Email Invalid"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];



module.exports = { validCreateUpUser };
