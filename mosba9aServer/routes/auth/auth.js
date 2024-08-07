const express = require("express");
const { login, validation } = require("../../controllers/auth/auth");
const authMiddleware = require("../../middleware/auth");
const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/auth/login",login);


//GET METHODS
Router.get("/api/v1.0/auth/validation",authMiddleware,validation);

module.exports = Router;