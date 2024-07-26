const express = require("express");
const authMiddleware = require("../../../middleware/client/auth");
const { getClientInformation, getAgreements, getElection, setVote, ElectionDetails, getAdvertising} = require("../../../controllers/client/userInformation/information");
const Router = express.Router();

//GET METHODS
Router.get("/api/v1.0/clientInformation/", authMiddleware, getClientInformation);
Router.get("/api/v1.0/clientInformation/agreements", authMiddleware, getAgreements);
Router.get("/api/v1.0/clientInformation/getElection", authMiddleware, getElection);
Router.get("/api/v1.0/clientInformation/electionDetails", authMiddleware, ElectionDetails)
Router.get("/api/v1.0/clientInformation/getAdvertising", authMiddleware ,getAdvertising)
//POST METHODS
Router.post("/api/v1.0/clientInformation/vote", authMiddleware, setVote)

module.exports = Router;