import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout.js";
import DefaultPage from "./pages/DefaultPage";
import MealPlanner from "./pages/MealPlanner";
import MyRecipes from "./pages/MyRecipes";
import FindRecipes from "./pages/FindRecipes";
import SignUp from "./components/SignUp.js";
import AboutUs from "./pages/AboutUs.js"
import NotFoundPage from "./pages/NotFoundPage.js"
import AccountInfo from "./pages/AccountInfo.js";
import { UserProvider } from "../src/components/UserContext";
import ProtectedRoute from './components/ProtectedRoute'; 

import "./App.css";

function App() {
    return (
        <Router>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<DefaultPage />} />
                    <Route
                        path="/meal-planner"
                        element={
                            <ProtectedRoute>
                                <Layout><MealPlanner /></Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-recipes"
                        element={
                            <ProtectedRoute>
                                <Layout><MyRecipes /></Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/find-recipes"
                        element={
                            <ProtectedRoute>
                                <Layout><FindRecipes /></Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/account-info"
                        element={
                            <ProtectedRoute>
                                <Layout><AccountInfo /></Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/about-us"
                        element={
                                <AboutUs />
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </UserProvider>
        </Router>
    );
}
export default App;