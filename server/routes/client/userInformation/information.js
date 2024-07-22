const express = require("express");
const authMiddleware = require("../../../middleware/client/auth");
const { getClientInformation } = require("../../../controllers/client/userInformation/information");
const { getAgreements } = require("../../../controllers/agreements/agreements");
const Router = express.Router();

//GET METHODS
Router.get("/api/v1.0/clientInformation/", authMiddleware, getClientInformation);
Router.get("/api/v1.0/clientInformation/agreements", authMiddleware, getAgreements)

module.exports = Router;