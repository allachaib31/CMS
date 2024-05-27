const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addFoundationSubscriptions, addMonthlySubscriptions, getAnnualSubscriptions, getSubscriptionHistory,searchSubscriptionHistory, updateCommentSubscribeHistory, getAnnualSubscriptionsDetails, updateCommentRecordAnnual, getSubscriptionsForm, getOverdueSubscriptions, updateInvoiceOverdue } = require("../../controllers/manageSubscription/subscriptions");
const Router = express.Router();

Router.use(authMiddleware);

//POST METHODS
Router.post("/api/v1.0/subscriptions/foundation", addFoundationSubscriptions);
Router.post("/api/v1.0/subscriptions/monthly", addMonthlySubscriptions);

//GET METHODS
Router.get("/api/v1.0/subscriptions/getSubscriptionsForm", getSubscriptionsForm);
Router.get("/api/v1.0/subscriptions/getOverdueSubscriptions", getOverdueSubscriptions)
Router.get("/api/v1.0/subscriptions/annual", getAnnualSubscriptions);
Router.get("/api/v1.0/subscriptions/annualDetails", getAnnualSubscriptionsDetails);
Router.get("/api/v1.0/subscriptions/history",getSubscriptionHistory);
Router.get("/api/v1.0/subscriptions/search", searchSubscriptionHistory)

//PATCH METHODS
Router.patch("/api/v1.0/subscriptions/updateCommentSubscribeHistory", updateCommentSubscribeHistory);
Router.patch("/api/v1.0/subscriptions/updateCommentRecordAnnual",updateCommentRecordAnnual)
Router.patch("/api/v1.0/subscriptions/isInvoiceOverdue", updateInvoiceOverdue);
module.exports = Router;