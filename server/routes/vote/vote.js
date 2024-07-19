const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addVote, getVote, voteDetails } = require("../../controllers/vote/vote");
const Router = express.Router();

Router.use(authMiddleware);

//POST METHODS
Router.post("/api/v1.0/vote/addVote", addVote);

//GET METHODS
Router.get("/api/v1.0/vote/getVote", getVote);
Router.get("/api/v1.0/vote/voteDetails", voteDetails);

module.exports = Router