const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addFinancialCompany, getIdFinancial, getFinancial, paymentFinancialCompany } = require("../../controllers/financialCompany/financialCompany");

const Router = express.Router();

Router.post("/api/v1.0/financial/add",authMiddleware, addFinancialCompany);
Router.post("/api/v1.0/financial/payment", authMiddleware, paymentFinancialCompany);

Router.get("/api/v1.0/financial/getIdFinancial", authMiddleware ,getIdFinancial);
Router.get("/api/v1.0/financial/getFinancial", authMiddleware, getFinancial);

module.exports = Router;