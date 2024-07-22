const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { createMoneyBox, getMoneyBox } = require("../../controllers/moneyBox/moneyBox");
const Router = express.Router();


//POST METHODS
//Router.post("/api/v1.0/moneyBox", createMoneyBox);

//GET METHODS
Router.get("/api/v1.0/moneyBox",authMiddleware, getMoneyBox)

module.exports = Router;