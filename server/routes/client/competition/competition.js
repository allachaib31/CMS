const express = require("express");
const authMiddleware = require("../../../middleware/client/auth");
const { getTiming, getInformation, enterToContest, getBrancheForUser,getQuestion, saveResponse, getUserResult } = require("../../../controllers/client/competition/competition");
const Router = express.Router();

//GET METHODS
Router.get("/api/v1.0/competition/getTiming", authMiddleware, getTiming);
Router.get("/api/v1.0/competition/getInformation", authMiddleware,getInformation);
Router.get("/api/v1.0/competition/getBranches", authMiddleware,getBrancheForUser);
Router.get("/api/v1.0/competition/getQuestion", authMiddleware, getQuestion);
Router.get("/api/v1.0/competition/userResult", authMiddleware, getUserResult);

//POST METHODS
Router.post("/api/v1.0/competition/enterToContest", authMiddleware,enterToContest);
Router.post("/api/v1.0/competition/saveResponse", authMiddleware, saveResponse)

module.exports = Router;