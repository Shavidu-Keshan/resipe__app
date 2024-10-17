import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new recipe
router.post("/", async (req, res) => {
  const recipe = new RecipesModel(req.body);
  try {
    const response = await recipe.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save a recipe for a user
router.put("/", async (req, res) => {
  const { recipeID, userID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(recipeID) || !mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({ message: "Invalid recipe or user ID" });
  }

  try {
    const recipe = await RecipesModel.findById(recipeID);
    const user = await UserModel.findById(userID);

    if (!user || !recipe) {
      return res.status(404).json({ message: "User or recipe not found" });
    }

    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get saved recipes IDs for a user
router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get saved recipes for a user
router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const savedRecipes = await RecipesModel.find({ _id: { $in: user.savedRecipes } });
    res.json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as recipesRouter };

