import React from "react";
import { Link } from 'react-router-dom';
import Home from "../pages/Home";
import "./Layout.css";

function Layout({ children }) {
    return (
        <div>
            <Home />
            <div className="page-content">{children}</div>
        </div>
    );
}

export default Layout;
