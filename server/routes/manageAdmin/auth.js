const express = require("express");
const { login, validation } = require("../../controllers/manageAdmin/auth");
const authMiddleware = require("../../middleware/admin/auth");
const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/auth/login",login);

Router.use(authMiddleware);

//GET METHODS
Router.get("/api/v1.0/auth/validation",validation);

module.exports = Router;