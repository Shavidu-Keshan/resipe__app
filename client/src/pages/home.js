import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      if (userID) {
        try {
          const response = await axios.get(
            `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
          );
          setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error("Error saving recipe:", err.message);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Recipes</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <li
            key={recipe._id}
            className="bg-white rounded-lg shadow-md overflow-hidden p-4"
          >
            <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
            <img
              className="w-full h-48 object-cover rounded-lg mb-4"
              src={recipe.imageUrl}
              alt={recipe.name}
            />
            <p className="text-gray-700 mb-4">{recipe.instructions}</p>
            <p className="text-sm font-light text-gray-600 mb-4">
              Cooking Time: {recipe.cookingTime} minutes
            </p>
            <button
              onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}
              className={`w-full text-white rounded-lg p-2 ${
                isRecipeSaved(recipe._id)
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
