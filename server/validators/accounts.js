const { check,validator } = require("express-validator");


const { validateResult } = require("../helpers/validators");


const validCreateUpAccount = [
  check("typeAccount")
    .not()
    .isEmpty()
    .withMessage("Type Account require")
    .isIn(["efectivo", "ahorro", "credito", "nomina", "wallet", "inversion", "vales","departamental"])
    .withMessage("Type Account not valid"),
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name require"),
  check("balance")
    .not()
    .isEmpty()
    .withMessage("Balance require")
    .isNumeric()
    .withMessage("Balance must be a number"),
  check("publicKey")
    .if((value, { req }) => req.body.typeAccount === "wallet")
    .not()
    .isEmpty()
    .withMessage("Public Key require")
    .isLength(64)
    .withMessage("Public key lenght must be 64")
    .isAlphanumeric()
    .withMessage("Public Key must be alphanumeric"), 
  check("numberAccount")
    .if((value, { req }) => req.body.typeAccount !== "wallet" && req.body.typeAccount !== "efectivo")
    .not()
    .isEmpty()
    .withMessage("Number Account require")
    .isNumeric()
    .withMessage("Number Account must be a number"),
  check("cutoffDate")
    .if((value, { req }) => req.body.typeAccount !== "wallet" && req.body.typeAccount !== "efectivo")
    .not()
    .isEmpty()
    .withMessage("Cutoff Date require")
    .isDate()
    .withMessage("Cutoff Date must be a date"),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];




module.exports = { validCreateUpAccount };
