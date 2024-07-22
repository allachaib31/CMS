const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addLoans, getLoansHistory, getIdLoans, searchLoans, getRecordInstallments, payInstallments } = require("../../controllers/loans/loans");
const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/loans/",authMiddleware, addLoans);
Router.post("/api/v1.0/loans/payInstallments",authMiddleware, payInstallments)

//GET METHODS
Router.get("/api/v1.0/loans/history",authMiddleware, getLoansHistory);
Router.get("/api/v1.0/loans/getIdLoans",authMiddleware, getIdLoans);
Router.get("/api/v1.0/loans/search",authMiddleware, searchLoans);
Router.get("/api/v1.0/loans/getRecordInstallments",authMiddleware, getRecordInstallments);

module.exports = Router;