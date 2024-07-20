const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addAgreements, getAgreements, updateAgreementsActive } = require("../../controllers/agreements/agreements");
const Router = express.Router();

Router.use(authMiddleware);

//POST METHODS
Router.post("/api/v1.0/agreements/add", addAgreements);

//GET METHDOS
Router.get("/api/v1.0/agreements/", getAgreements);

//UPDATE METHODS
Router.patch("/api/v1.0/agreements",updateAgreementsActive)

module.exports = Router