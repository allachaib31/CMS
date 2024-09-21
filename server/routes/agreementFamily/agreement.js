const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addAgreements, getAgreements, updateAgreementsActive } = require("../../controllers/agreementsFamily/agreements");
const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/agreementsFamily/add", authMiddleware, addAgreements);

//GET METHDOS
Router.get("/api/v1.0/agreementsFamily/", authMiddleware, getAgreements);

//UPDATE METHODS
Router.patch("/api/v1.0/agreementsFamily", authMiddleware ,updateAgreementsActive)

module.exports = Router