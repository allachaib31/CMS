const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addBloodMoney, payBloodMoney, getPaymentBloodMoney, getRecordBloodMoney } = require("../../controllers/bloodMoney/bloodMoney");

const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/bloodMoney/add",authMiddleware, addBloodMoney);
Router.post("/api/v1.0/bloodMoney/pay",authMiddleware, payBloodMoney);

//GET METHODS
Router.get("/api/v1.0/bloodMoney/payment",authMiddleware, getPaymentBloodMoney);
Router.get("/api/v1.0/bloodMoney/record",authMiddleware, getRecordBloodMoney);

module.exports = Router;