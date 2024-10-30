// src/components/NavigateButton.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface NavigateButtonProps {
    to: string;          // Ruta a la que navegar
    label: string;       // Texto del botón
    variant?: string;    // Variante de Bootstrap (opcional, por defecto 'primary')
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ to, label, variant = 'primary' }) => {
    return (
        <Link to={to} className={`btn btn-${variant}`}>
            {label}
        </Link>
    );
};

export default NavigateButton;
