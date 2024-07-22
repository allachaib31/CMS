const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { getConsolidatedRecordRevenues } = require("../../controllers/manageContributionRevenue/contributionRevenue");
const Router = express.Router();


//GET METHODS
Router.get("/api/v1.0/contributionRevenue/consolidatedRecordRevenues",authMiddleware, getConsolidatedRecordRevenues);


module.exports = Router;