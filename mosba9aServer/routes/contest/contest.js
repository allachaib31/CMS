const express = require("express");
const authMiddleware = require("../../middleware/auth");
const { addContest, getContest, addBranche, getBranche, addQuestion,getBrancheUserId, getQuestions, removeQuestion, removeContest, removeBranche } = require("../../controllers/contest/contest");
const Router = express.Router();


//POST METHODS
Router.post("/api/v1.0/addContest",authMiddleware, addContest);
Router.post("/api/v1.0/addBranche",authMiddleware, addBranche);
Router.post("/api/v1.0/addQuestion",authMiddleware, addQuestion);

//GET METHODS
Router.get("/api/v1.0/getContest",authMiddleware, getContest);
Router.get("/api/v1.0/getBranche",authMiddleware, getBranche);
Router.get("/api/v1.0/getQuestions",authMiddleware, getQuestions);
Router.get("/api/v1.0/getBrancheUserId", authMiddleware, getBrancheUserId);

//REMOVE METHODS
Router.delete("/api/v1.0/removeContest",authMiddleware, removeContest)
Router.delete("/api/v1.0/removeBranche",authMiddleware, removeBranche)
Router.delete("/api/v1.0/removeQuestion",authMiddleware, removeQuestion)

module.exports = Router;
