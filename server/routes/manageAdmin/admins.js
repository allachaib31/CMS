const express = require("express");
const { addAdmin, getAdmin, updateAdmin, deleteAdmin, searchAdmin } = require("../../controllers/manageAdmin/admins");
const authMiddleware = require("../../middleware/admin/auth");
const Router = express.Router();

Router.use(authMiddleware);

//POST METHODS
Router.post("/api/v1.0/admins/", addAdmin);

//GET METHODS
Router.get("/api/v1.0/admins/", getAdmin);
Router.get("/api/v1.0/admins/search", searchAdmin)

//UPDATE METHODS
Router.patch("/api/v1.0/admins/", updateAdmin);

//DELETE METHODS
Router.delete("/api/v1.0/admins/", deleteAdmin);

module.exports = Router;