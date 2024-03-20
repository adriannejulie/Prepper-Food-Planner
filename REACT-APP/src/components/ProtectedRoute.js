import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Ensure this is the correct path

function ProtectedRoute({ children }) {
    const { user } = useUser(); 
    const isAuthenticated = !!user; 

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;
