import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from "../context/UserAuthContext";

function ProtectedRUser({children}) {
    const { admin } = useUserAuth();

    if (admin) {
     return <Navigate to="/" />
    }
     return children;
}

export default ProtectedRUser;