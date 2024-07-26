const express = require("express");
const authMiddleware = require("../../../middleware/client/auth");
const { getTiming, getInformation, enterToContest, getBrancheForUser,getQuestion } = require("../../../controllers/client/competition/competition");
const Router = express.Router();

//GET METHODS
Router.get("/api/v1.0/competition/getTiming", authMiddleware, getTiming);
Router.get("/api/v1.0/competition/getInformation", authMiddleware,getInformation);
Router.get("/api/v1.0/competition/getBranches", authMiddleware,getBrancheForUser);
Router.get("/api/v1.0/competition/getQuestion", authMiddleware, getQuestion)

//POST METHODS
Router.post("/api/v1.0/competition/enterToContest", authMiddleware,enterToContest)

module.exports = Router;