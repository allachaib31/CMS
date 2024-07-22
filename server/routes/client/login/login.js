const express = require("express");
const { login, validation } = require("../../../controllers/client/auth/auth");
const authMiddleware = require("../../../middleware/client/auth");
const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/authClient/login",login);


//GET METHODS
Router.get("/api/v1.0/authClient/validation", authMiddleware,validation);

module.exports = Router;