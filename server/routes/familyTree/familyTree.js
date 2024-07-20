const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addToFamilyTree, getFamilyTree, updateFamilyTree, createNewFamilyTree, getFamilyTreeUseId, getIdFamilyTree } = require("../../controllers/familyTree/familyTree");
const Router = express.Router();

Router.use(authMiddleware);

//POST MEHTODS
Router.post("/api/v1.0/familyTree/createNewFamilyTree", createNewFamilyTree)
Router.post("/api/v1.0/familyTree", addToFamilyTree);

//GET METHODS
Router.get("/api/v1.0/familyTree", getFamilyTree);
Router.get("/api/v1.0/familyTree/withId", getFamilyTreeUseId);
Router.get("/api/v1.0/familyTree/getListId", getIdFamilyTree)

//PATCH METHODS
Router.patch("/api/v1.0/familyTree", updateFamilyTree)

module.exports = Router