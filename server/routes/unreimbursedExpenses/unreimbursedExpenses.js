const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addTypeExpenses, getTypeExpenses ,addExpenses, getRecordUnrecovereExpenses, searchUnReimbursedExpenses, getIdUnReimbursedExpenses,payCash, getUnReimbursedExpenses, deleteTypeExpenses} = require("../../controllers/unreimbursedExpenses/unreimbursedExpenses");

const Router = express.Router();


//POST METHODS
Router.post("/api/v1.0/unReimbursedExpenses/addTypeExpenses",authMiddleware, addTypeExpenses);
Router.post("/api/v1.0/unReimbursedExpenses/addExpenses",authMiddleware, addExpenses);
Router.post("/api/v1.0/unReimbursedExpenses/payCash",authMiddleware,payCash)

//GET METHODS
Router.get("/api/v1.0/unReimbursedExpenses/getTypeExpenses",authMiddleware, getTypeExpenses);
Router.get("/api/v1.0/unReimbursedExpenses/getRecordUnrecovereExpenses",authMiddleware, getRecordUnrecovereExpenses)
Router.get("/api/v1.0/unReimbursedExpenses/searchUnReimbursedExpenses",authMiddleware, searchUnReimbursedExpenses)
Router.get("/api/v1.0/unReimbursedExpenses/getIdUnReimbursedExpenses",authMiddleware, getIdUnReimbursedExpenses)
Router.get("/api/v1.0/unReimbursedExpenses/getUnReimbursedExpenses",authMiddleware, getUnReimbursedExpenses);

//DELETE METHODS
Router.delete("/api/v1.0/unReimbursedExpenses/deleteTypeExpenses",authMiddleware, deleteTypeExpenses);

module.exports = Router;