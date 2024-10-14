import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <Link to="/" className="text-white text-lg font-semibold hover:text-gray-300 transition duration-200">
            Home
          </Link>
          <Link to="/create-recipe" className="text-white text-lg font-semibold hover:text-gray-300 transition duration-200">
            Create Recipe
          </Link>
          <Link to="/saved-recipes" className="text-white text-lg font-semibold hover:text-gray-300 transition duration-200">
            Saved Recipes
          </Link>
        </div>
        <div>
          {!cookies.access_token ? (
            <Link
              to="/auth"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Login/Register
            </Link>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
