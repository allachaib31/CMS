const express = require("express");
const { addAdmin, getAdmin, updateAdmin, deleteAdmin, searchAdmin } = require("../../controllers/manageAdmin/admins");
const authMiddleware = require("../../middleware/admin/auth");
const Router = express.Router();


//POST METHODS
Router.post("/api/v1.0/admins/",authMiddleware, addAdmin);

//GET METHODS
Router.get("/api/v1.0/admins/",authMiddleware, getAdmin);
Router.get("/api/v1.0/admins/search",authMiddleware, searchAdmin)

//UPDATE METHODS
Router.patch("/api/v1.0/admins/",authMiddleware, updateAdmin);

//DELETE METHODS
Router.delete("/api/v1.0/admins/",authMiddleware, deleteAdmin);

module.exports = Router;