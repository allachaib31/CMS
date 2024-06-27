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

Router.use(authMiddleware);

//POST METHODS
Router.post("/api/v1.0/users/addUser", addUser);

//GET METHODS
Router.get("/api/v1.0/users/", getUser);
Router.get("/api/v1.0/users/search", searchUser)

//UPDATE METHODS
Router.put("/api/v1.0/users", updateUser);
Router.patch("/api/v1.0/users/updatePassword", updatePassword);
Router.patch("/api/v1.0/users/changeStatus", changeStatus);

//DELETE METHODS
Router.delete("/api/v1.0/users/", deleteUser);

module.exports = Router;
