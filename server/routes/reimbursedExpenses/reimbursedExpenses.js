const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addTypeExpenses, getTypeExpenses, deleteTypeExpenses, addExpenses, getRecordReimbursedExpenses, getReimbursedExpenses } = require("../../controllers/reimbursedExpenses/reimbursedExpenses");
const Router = express.Router();


//POST METHODS
Router.post("/api/v1.0/reimbursedExpenses/addTypeExpenses",authMiddleware, addTypeExpenses);
Router.post("/api/v1.0/reimbursedExpenses/addExpenses",authMiddleware, addExpenses);

//GET METHODS
Router.get("/api/v1.0/reimbursedExpenses/getTypeExpenses",authMiddleware, getTypeExpenses);
Router.get("/api/v1.0/reimbursedExpenses/getRecordReimbursedExpenses",authMiddleware, getRecordReimbursedExpenses);
Router.get("/api/v1.0/reimbursedExpenses/getReimbursedExpenses",authMiddleware, getReimbursedExpenses);

//DELETE METHODS
Router.delete("/api/v1.0/reimbursedExpenses/deleteTypeExpenses",authMiddleware, deleteTypeExpenses)

module.exports = Router;