import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-6">
                    <Link to="/" className="text-white text-lg font-semibold hover:text-gray-300 transition duration-200">Home</Link>
                    <Link to="/create-recipe" className="text-white text-lg font-semibold hover:text-gray-300 transition duration-200">Create Recipe</Link>
                    <Link to="/saved-recipes" className="text-white text-lg font-semibold hover:text-gray-300 transition duration-200">Saved Recipes</Link>
                </div>
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Login/Register
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
                            <Link to="/auth" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</Link>
                            <Link to="/auth" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
