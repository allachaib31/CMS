const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addAgreements, getAgreements, updateAgreementsActive } = require("../../controllers/agreements/agreements");
const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/agreements/add", authMiddleware, addAgreements);

//GET METHDOS
Router.get("/api/v1.0/agreements/", authMiddleware, getAgreements);

//UPDATE METHODS
Router.patch("/api/v1.0/agreements", authMiddleware ,updateAgreementsActive)

module.exports = Router