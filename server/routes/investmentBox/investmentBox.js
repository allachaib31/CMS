const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addInvestmentBox, getIdInvestmentBox, getInvestmentBox, paymentInvesment } = require("../../controllers/investmentBox/investmentBox");

const Router = express.Router();

Router.post("/api/v1.0/investmentBox/add",authMiddleware, addInvestmentBox);
Router.post("/api/v1.0/investmentBox/payment", authMiddleware, paymentInvesment);

Router.get("/api/v1.0/investmentBox/getIdInvestmentBox", authMiddleware ,getIdInvestmentBox);
Router.get("/api/v1.0/investmentBox/getInvestmentBox", authMiddleware, getInvestmentBox);

module.exports = Router;