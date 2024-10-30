// src/pages/Welcome.tsx
import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import NavigateButton from './components/NavigateButton';

const Welcome: React.FC = () => {
    const { user, logout } = useContext(AuthContext);
    console.log('Usuario en Welcome:', user);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Bienvenido, {user?.username}!</h1>
                <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
            <p>
                Nos complace darte la bienvenida a DataMarket. Aquí podrás explorar una amplia variedad de datasets que te ayudarán a potenciar tus proyectos de análisis de datos, machine learning y más. Nuestro catálogo está constantemente actualizado para ofrecerte la información más relevante y útil.
            </p>

            <NavigateButton to="/add-dataset" label="Agregar Nuevo Dataset" variant="success" />
            {/* Puedes agregar más contenido relacionado con datasets aquí */}
        </div>
    );
}

export default Welcome;
