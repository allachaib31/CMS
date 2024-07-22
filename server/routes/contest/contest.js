const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addContest, getContest, addBranche, getBranche, addQuestion, getQuestions, removeQuestion } = require("../../controllers/contest/contest");
const Router = express.Router();


//POST METHODS
Router.post("/api/v1.0/addContest",authMiddleware, addContest);
Router.post("/api/v1.0/addBranche",authMiddleware, addBranche);
Router.post("/api/v1.0/addQuestion",authMiddleware, addQuestion);

//GET METHODS
Router.get("/api/v1.0/getContest",authMiddleware, getContest);
Router.get("/api/v1.0/getBranche",authMiddleware, getBranche);
Router.get("/api/v1.0/getQuestions",authMiddleware, getQuestions);

//REMOVE METHODS
Router.delete("/api/v1.0/removeQuestion",authMiddleware, removeQuestion)

module.exports = Router;
