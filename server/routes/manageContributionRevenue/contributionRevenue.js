const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { getConsolidatedRecordRevenues } = require("../../controllers/manageContributionRevenue/contributionRevenue");
const Router = express.Router();

Router.use(authMiddleware);

//GET METHODS
Router.get("/api/v1.0/contributionRevenue/consolidatedRecordRevenues", getConsolidatedRecordRevenues);


module.exports = Router;