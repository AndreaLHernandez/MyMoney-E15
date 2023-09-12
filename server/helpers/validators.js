const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();

    return next();
  } catch (e) {
    res.status(401);
    res.send({ errors: e.array()[0].msg + ": " + e.array()[0].param });
  }
};

module.exports = { validateResult };
