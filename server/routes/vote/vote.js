const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addVote, getVote, voteDetails, deleteVote } = require("../../controllers/vote/vote");
const Router = express.Router();


//POST METHODS
Router.post("/api/v1.0/vote/addVote",authMiddleware, addVote);

//GET METHODS
Router.get("/api/v1.0/vote/getVote",authMiddleware, getVote);
Router.get("/api/v1.0/vote/voteDetails",authMiddleware, voteDetails);

Router.delete("/api/v1.0/vote/delete",authMiddleware , deleteVote)
module.exports = Router