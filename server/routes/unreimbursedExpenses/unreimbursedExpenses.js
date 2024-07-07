const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addTypeExpenses, getTypeExpenses ,addExpenses, getRecordUnrecovereExpenses, searchUnReimbursedExpenses, getIdUnReimbursedExpenses,payCash, getUnReimbursedExpenses} = require("../../controllers/unreimbursedExpenses/unreimbursedExpenses");

const Router = express.Router();

Router.use(authMiddleware);

//POST METHODS
Router.post("/api/v1.0/unReimbursedExpenses/addTypeExpenses", addTypeExpenses);
Router.post("/api/v1.0/unReimbursedExpenses/addExpenses", addExpenses);
Router.post("/api/v1.0/unReimbursedExpenses/payCash",payCash)

//GET METHODS
Router.get("/api/v1.0/unReimbursedExpenses/getTypeExpenses", getTypeExpenses);
Router.get("/api/v1.0/unReimbursedExpenses/getRecordUnrecovereExpenses", getRecordUnrecovereExpenses)
Router.get("/api/v1.0/unReimbursedExpenses/searchUnReimbursedExpenses", searchUnReimbursedExpenses)
Router.get("/api/v1.0/unReimbursedExpenses/getIdUnReimbursedExpenses", getIdUnReimbursedExpenses)
Router.get("/api/v1.0/unReimbursedExpenses/getUnReimbursedExpenses", getUnReimbursedExpenses);

module.exports = Router;