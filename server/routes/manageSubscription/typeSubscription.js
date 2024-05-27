const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addTypeSubscription, getTypeSubscription, updateTypeSubscription, deleteTypeSubscription } = require("../../controllers/manageSubscription/typeSubscription");
const Router = express.Router();

Router.use(authMiddleware);

//POST METHODS
//Router.post("/api/v1.0/typeSubscription/", addTypeSubscription);

//GET METHODS
Router.get("/api/v1.0/typeSubscription", getTypeSubscription)

//UPDATE METHODS
Router.patch("/api/v1.0/typeSubscription", updateTypeSubscription);

//DELETE METHODS
//Router.delete("/api/v1.0/typeSubscription", deleteTypeSubscription);

module.exports = Router;