// src/components/ProtectedRout.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRout: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.log('Estado del usuario en ProtectedRoute:', user);

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRout;
