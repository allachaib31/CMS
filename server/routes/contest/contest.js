const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addContest, getContest, addBranche, getBranche } = require("../../controllers/contest/contest");
const Router = express.Router();

Router.use(authMiddleware);

//POST METHODS
Router.post("/api/v1.0/addContest", addContest);
Router.post("/api/v1.0/addBranche", addBranche);

//GET METHODS
Router.get("/api/v1.0/getContest", getContest);
Router.get("/api/v1.0/getBranche", getBranche);

module.exports = Router;
