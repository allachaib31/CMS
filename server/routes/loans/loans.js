const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addLoans, getLoansHistory, getIdLoans, searchLoans, getRecordInstallments } = require("../../controllers/loans/loans");
const Router = express.Router();

Router.use(authMiddleware);

//POST METHODS
Router.post("/api/v1.0/loans/", addLoans);

//GET METHODS
Router.get("/api/v1.0/loans/history", getLoansHistory);
Router.get("/api/v1.0/loans/getIdLoans", getIdLoans);
Router.get("/api/v1.0/loans/search", searchLoans);
Router.get("/api/v1.0/loans/getRecordInstallments", getRecordInstallments);

module.exports = Router;