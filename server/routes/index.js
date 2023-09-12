const { users, accounts,login,activeuser,tags, search, movements, recoveryPassword, goals} = require("../controllers");
const {checkJwt} = require("../middlewares/auth");
const { Router } = require("express");
const { validCreateUpAccount } = require("../validators/accounts");
const {validCreateUpUser} = require("../validators/users");
const {validMovement} = require("../validators/movement");
const {validCreateUpTags} = require("../validators/tags");
const {validCreateUpGoals} = require("../validators/goals");
const {validChangePassword} = require("../validators/login");


const router = Router();

router
  .route("/auth/signup")
  .get(users.getUsers)
  .post(validCreateUpUser, users.addUser)
  

router
  .route("/auth/verify-email/:token")
  .get(activeuser.confirm);

router
  .route("/users/:id")
  .get(users.getUserById)
  .put(users.updateUser)
  .delete(users.deleteUser);
router
  .route("/auth/login")
  .post(login.userLogin)
router
  .route("/auth/accesToken")
  .post(login.createAccesToken)
router
  .route("/auth/login/:id")
  .put(checkJwt,validChangePassword,login.changePassword)

router
  .route("/accounts")
  .post(checkJwt,validCreateUpAccount, accounts.addAccount)
  .put(checkJwt,accounts.updateAccount)
  .delete(checkJwt,accounts.deleteAccount);

router
  .route("/tags")
  .post(validCreateUpTags, checkJwt, tags.addTag);

router
  .route("/movements")
  .post(validMovement,checkJwt,movements.addMovement)
  .delete(checkJwt,movements.deleteMovements);
  

router
  .route("/search/:model")
  .get(checkJwt,search.getSearch);

router
  .route("/recovery-password")
  .put(recoveryPassword.updatePass)

router
  .route("/goals")
  .post(validCreateUpGoals, checkJwt, goals.addGoal);
  

module.exports = { router };
