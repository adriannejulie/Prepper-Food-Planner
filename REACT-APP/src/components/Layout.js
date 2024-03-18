import React from "react";
import Navbar from "../pages/Navbar";
import "./Layout.css";

function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <div className="page-content">{children}</div>
        </div>
    );
}

export default Layout;
