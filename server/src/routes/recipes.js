import { RecipesModel } from "../models/Recipes.js";
import mongoose from "mongoose";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const response = await RecipesModel.find({});
        res.json(response);
    }catch(error){
        res.json({message: error});
    }
})

router.post("/", async (req, res) => {
    const recipe = new RecipesModel(req.body);
    try{
        const response = await recipe.save();
        res.json(response);
    }catch(error){
        res.json({message: error});
    }
})

router.put("/", async (req, res) => {
    const recipe = await RecipesModel.findById(req.body.recipeId);
    const user = await UserModel.findById(req.body.userID);

    try{
        const recipe = await RecipesModel.findById(req.body.recipeId);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.status(201).json({savedRecipes: user.savedRecipes});
        
        res.json(response);
    }catch(error){
        res.json({message: error});
    }
})

router.get("/savedRecipes/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        res.json({savedRecipes: user.savedRecipes});
    } catch (error) {
        res.json({message: error});
    }
})

router.get("/savedRecipes", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        const savedRecipes = await RecipesModel.find({ _id: { $in: user.savedRecipes } });
        res.json({savedRecipes});
    } catch (error) {
        res.json({message: error});
    }
})



export {router as recipesRouter};