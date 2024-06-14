import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'


function ProtectedRoute({ children }) {

    if (localStorage.getItem('token')) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}

export default ProtectedRoute