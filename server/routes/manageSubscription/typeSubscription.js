const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addTypeSubscription, getTypeSubscription, updateTypeSubscription, deleteTypeSubscription } = require("../../controllers/manageSubscription/typeSubscription");
const Router = express.Router();

//POST METHODS
//Router.post("/api/v1.0/typeSubscription/", addTypeSubscription);

//GET METHODS
Router.get("/api/v1.0/typeSubscription",authMiddleware, getTypeSubscription)

//UPDATE METHODS
Router.patch("/api/v1.0/typeSubscription",authMiddleware, updateTypeSubscription);

//DELETE METHODS
//Router.delete("/api/v1.0/typeSubscription", deleteTypeSubscription);

module.exports = Router;