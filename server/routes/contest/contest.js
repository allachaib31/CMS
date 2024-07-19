const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addContest, getContest, addBranche, getBranche, addQuestion, getQuestions, removeQuestion } = require("../../controllers/contest/contest");
const Router = express.Router();

Router.use(authMiddleware);

//POST METHODS
Router.post("/api/v1.0/addContest", addContest);
Router.post("/api/v1.0/addBranche", addBranche);
Router.post("/api/v1.0/addQuestion", addQuestion);

//GET METHODS
Router.get("/api/v1.0/getContest", getContest);
Router.get("/api/v1.0/getBranche", getBranche);
Router.get("/api/v1.0/getQuestions", getQuestions);

//REMOVE METHODS
Router.delete("/api/v1.0/removeQuestion", removeQuestion)

module.exports = Router;
