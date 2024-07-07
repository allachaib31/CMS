const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addTypeExpenses, getTypeExpenses, deleteTypeExpenses, addExpenses, getRecordReimbursedExpenses, getReimbursedExpenses } = require("../../controllers/reimbursedExpenses/reimbursedExpenses");
const Router = express.Router();

Router.use(authMiddleware);

//POST METHODS
Router.post("/api/v1.0/reimbursedExpenses/addTypeExpenses", addTypeExpenses);
Router.post("/api/v1.0/reimbursedExpenses/addExpenses", addExpenses);

//GET METHODS
Router.get("/api/v1.0/reimbursedExpenses/getTypeExpenses", getTypeExpenses);
Router.get("/api/v1.0/reimbursedExpenses/getRecordReimbursedExpenses", getRecordReimbursedExpenses);
Router.get("/api/v1.0/reimbursedExpenses/getReimbursedExpenses", getReimbursedExpenses);

//DELETE METHODS
Router.delete("/api/v1.0/reimbursedExpenses/deleteTypeExpenses", deleteTypeExpenses)

module.exports = Router;