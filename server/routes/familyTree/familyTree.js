const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addToFamilyTree, getFamilyTree, updateFamilyTree, createNewFamilyTree, getFamilyTreeUseId, getIdFamilyTree } = require("../../controllers/familyTree/familyTree");
const Router = express.Router();


//POST MEHTODS
Router.post("/api/v1.0/familyTree/createNewFamilyTree",authMiddleware, createNewFamilyTree)
Router.post("/api/v1.0/familyTree",authMiddleware, addToFamilyTree);

//GET METHODS
Router.get("/api/v1.0/familyTree",authMiddleware, getFamilyTree);
Router.get("/api/v1.0/familyTree/withId",authMiddleware, getFamilyTreeUseId);
Router.get("/api/v1.0/familyTree/getListId",authMiddleware, getIdFamilyTree)

//PATCH METHODS
Router.patch("/api/v1.0/familyTree",authMiddleware, updateFamilyTree)

module.exports = Router