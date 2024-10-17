import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

// Ensure that SavedRecipes is declared before exporting
export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Saved Recipes</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedRecipes.map((recipe) => (
          <li
            key={recipe._id}
            className="bg-white rounded-lg shadow-md overflow-hidden p-4"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
            </div>
            <p className="text-gray-700 mb-4">{recipe.description}</p>
            <img
              className="w-full h-48 object-cover rounded-lg mb-4"
              src={recipe.imageUrl}
              alt={recipe.name}
            />
            <p className="text-sm font-light text-gray-600 mb-4">
              Cooking Time: {recipe.cookingTime} minutes
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
