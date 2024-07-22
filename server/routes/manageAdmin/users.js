const express = require("express");
const {
    addUser,
    getUser,
    searchUser,
    updateUser,
    changeStatus,
    deleteUser,
    updatePassword,
} = require("../../controllers/manageAdmin/users");
const authMiddleware = require("../../middleware/admin/auth");
const Router = express.Router();


//POST METHODS
Router.post("/api/v1.0/users/addUser",authMiddleware, addUser);

//GET METHODS
Router.get("/api/v1.0/users/",authMiddleware, getUser);
Router.get("/api/v1.0/users/search",authMiddleware, searchUser)

//UPDATE METHODS
Router.put("/api/v1.0/users",authMiddleware, updateUser);
Router.patch("/api/v1.0/users/updatePassword",authMiddleware, updatePassword);
Router.patch("/api/v1.0/users/changeStatus",authMiddleware, changeStatus);

//DELETE METHODS
Router.delete("/api/v1.0/users/",authMiddleware, deleteUser);

module.exports = Router;
