import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout.js"; 
import DefaultPage from "./pages/DefaultPage";
import MealPlanner from "./pages/MealPlanner";
import MyRecipes from "./pages/MyRecipes";
import FindRecipes from "./pages/FindRecipes";
import SignUp from "./components/SignUp.js";
import "./App.css";


function App() {
    return (
        <Router>
          <Layout>
                <Routes>
                    <Route path="/" element={<DefaultPage />} />
                    <Route path="/meal-planner" element={<MealPlanner />} />
                    <Route path="/my-recipes" element={<MyRecipes />} />
                    <Route path="/find-recipes" element={<FindRecipes />} />
                </Routes>
                </Layout>
        </Router>
    );
}

export default App;