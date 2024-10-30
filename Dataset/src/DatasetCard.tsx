import React, { useState } from 'react';
interface DatasetCardProps {
    id: number;
    nombre: string;
    descripcion: string;
}

const DatasetCard: React.FC<DatasetCardProps> = ({ nombre, descripcion }) => {
    
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseEnter() {
        setIsHovered(true);
    }

    function handleMouseLeave() {
        setIsHovered(false);
    }
    
    return (
        <div className={'card mb-3' + `ojo ${isHovered ? 'big' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="card-body">
                <h5 className="card-title">{nombre}</h5>
                <p className="card-text">{descripcion}</p>
            </div>
        </div>
    );
}

export default DatasetCard;
