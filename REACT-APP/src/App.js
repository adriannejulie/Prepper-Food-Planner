import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout.js";
import DefaultPage from "./pages/DefaultPage";
import MealPlanner from "./pages/MealPlanner";
import MyRecipes from "./pages/MyRecipes";
import FindRecipes from "./pages/FindRecipes";
import SignUp from "./components/SignUp.js";
import { UserProvider } from "../src/components/UserContext";

import "./App.css";

function App() {
    return (
        <Router>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<DefaultPage />} />
                    <Route
                        path="/meal-planner"
                        element={<Layout><MealPlanner /></Layout>}
                    />
                    <Route
                        path="/my-recipes"
                        element={<Layout><MyRecipes /></Layout>}
                    />
                    <Route
                        path="/find-recipes"
                        element={<Layout><FindRecipes /></Layout>}
                    />
                </Routes>
            </UserProvider>

        </Router>
    );
}


export default App;