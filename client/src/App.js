import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from './pages/home.js';
import { Auth } from './pages/auth.js';
import { CreateRecipe } from './pages/create-recipe.js';
import { SavedRecipes } from './pages/saved-recipes.js';
import { Navbar } from './components/navbar.js';

function App() {
  return (
    <div className="App min-h-screen bg-gray-100">
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/auth" element={<Auth />}/>
            <Route path="/create-recipe" element={<CreateRecipe />}/>
            <Route path="/saved-recipes" element={<SavedRecipes />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

