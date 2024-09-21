const express = require("express");
const authMiddleware = require("../../middleware/authClient");
const { getTiming, getBrancheForUser, getQuestion, saveResponse,getUserResultBranche, getBrancheId, getUserResult, getContest } = require("../../controllers/competition/competition");
const Router = express.Router();

//GET METHODS
Router.get("/api/v1.0/competition/getTiming", authMiddleware, getTiming);
Router.get("/api/v1.0/competition/getContest", authMiddleware,getContest);
Router.get("/api/v1.0/competition/getBranches", authMiddleware,getBrancheForUser);
Router.get("/api/v1.0/competition/getQuestions", authMiddleware, getQuestion);
Router.get("/api/v1.0/competition/userResult", authMiddleware, getUserResult);
Router.get("/api/v1.0/competition/getBrancheId", authMiddleware, getBrancheId);
Router.get("/api/v1.0/competition/getUserResultBranche", authMiddleware, getUserResultBranche);
//Router.get("/api/v1.0/competition/getContestResult", authMiddleware, getContestResult);

//POST METHODS
//Router.post("/api/v1.0/competition/enterToContest", authMiddleware,enterToContest);
Router.post("/api/v1.0/competition/saveResponse", authMiddleware, saveResponse)

module.exports = Router;