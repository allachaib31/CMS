const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addFatwas, getFatwas, updateFatwasActive } = require("../../controllers/fatwa/fatwa");
const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/fatwa/add", authMiddleware, addFatwas);

//GET METHDOS
Router.get("/api/v1.0/fatwa/", authMiddleware, getFatwas);

//UPDATE METHODS
Router.patch("/api/v1.0/fatwa", authMiddleware ,updateFatwasActive)

module.exports = Router