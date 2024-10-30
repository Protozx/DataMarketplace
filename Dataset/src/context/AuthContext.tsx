// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    logout: () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el usuario está autenticado al cargar la app
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get('/me'); // Nueva ruta para obtener el usuario actual
                if (response.data) {
                    setUser(response.data);
                    console.log('Usuario autenticado:', response.data);
                }
            } catch (err) {
                setUser(null);
                console.log('No hay usuario autenticado.');
            }
        };
        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await axiosInstance.post('/logout');
            setUser(null);
            navigate('/login');
            console.log('Usuario ha cerrado sesión.');
        } catch (err) {
            console.error('Error al cerrar sesión:', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
