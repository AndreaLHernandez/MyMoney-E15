const models = require("../../database/models");
const { httpError, response } = require("../helpers/responses");
const { accountNotFound, accountDeleted} = require("../helpers/constants.js");
const { validAccount, validWalletAccount } = require("../validators/accounts");
const bcrypt = require("bcryptjs");



// EP to get account by id
const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;

    const getAccount = await models.accounts.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!getAccount) return res.status(404).send(response(userNotFound));

    return res.status(200).send(getAccount);
  } catch (error) {
    httpError(res, error);
  }
};

//EP to add Account
const addAccount = async (req, res) => {
  try {
    
    const { body } = req;
    const validateAccount = await models.accounts.findOne({
      where: {
        userId: req.user.id,
        name: body.name,
      }
    });

    if (validateAccount){
      return res.status(401).send("Account exists, chosse another name");
    }
    if(body.typeAccount=== "wallet"){
      const validateWallet = await models.accounts.findOne({
        where: {
          publicKey: body.publicKey,
        }
      });
      if (validateWallet){
        return res.status(401).send("Public key exists");
      }
    }
    if(body.typeAccount!= "wallet"&& body.typeAccount!= "efectivo"){
      const validateCta = await models.accounts.findOne({
        where: {
          numberAccount: body.numberAccount,
        }
      });
      if (validateCta){
        return res.status(401).send("Number account exists");
      }
    }
      const account = await models.accounts.create({
        name: body.name,
        typeAccount: body.typeAccount,
        numberAccount: body.numberAccount,
        CVE: body.CVE,
        publicKey: body.publicKey,
        balance: body.balance,
        cutoffDate: body.cutoffDate,
        userId: req.user.id
      });
    
    
    
    return res.status(201).send("Account created succesfully");
  } catch (error) {
    httpError(res, error);
  }
};

//EP to update account
const updateAccount = async (req, res) => {
  try {
    const { body } = req;
    const account = await models.accounts.findOne({
      where: {
        numberAccount: body.numberAccount,
        statusDelete: false,
      },
    });
    if (!account) return res.status(404).send(response(accountNotFound));

    account.update({
      name: body.name,
      typeAccount: body.typeAccount,
      numberAccount: body.numberAccount,
      publicKey: body.publicKey,
      CVE: body.CVE,
      balance: body.balance,
      cutoffDate: body.cutoffDate
    });

    return res.status(200).send(account);
  } catch (error) {
    httpError(res, error);
  }
};

//EP to "delete" account in this case is soft delete, change the value statusDelete true
const deleteAccount = async (req, res) => {
  try {
    const { body } = req;

    const account = await models.accounts.findOne({
      where: {
        numberAccount: body.numberAccount,
        statusDelete: false,
      },
    });

    if (!account) return res.status(404).send(response(accountNotFound));

    account.update({
      statusDelete: true,
    });

    return res.status(200).send(response(accountDeleted));
  } catch (error) {
    httpError(res, error);
  }
};

module.exports = {
  addAccount,
  getAccountById,
  updateAccount,
  deleteAccount
  
};