import { useState, useEffect } from 'react';
import Comments from './Comments'; // Asegúrate de que la ruta sea correcta

interface DatasetProps {
    datasetName: string;
    author: string;
    lastUpdated: string;
    description: string;
    grafic: string;
    statistics: string;
    comments: {
        id: number;
        author: string;
        content: string;
        date: string;
    }[];
}



function DatasetView(props: DatasetProps) {
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:8081/users')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
    }, [])

    const { datasetName, author, lastUpdated, description, grafic, statistics, comments } = props;
    const [activeTab, setActiveTab] = useState<'visualization' | 'statistics' | 'comments'>('visualization');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'visualization':
                return (
                    <div>
                        <img src={grafic} alt="Visualización" className="img-fluid" />
                        <p>Contenido de la visualización aquí</p>
                    </div>
                );
            case 'statistics':
                return (
                    <div>
                        <img src={statistics} alt="Estadísticas" className="img-fluid" />
                        <p>Estadísticas del dataset aquí</p>
                    </div>
                );
            case 'comments':
                return <Comments comments={comments} />;
            default:
                return null;
        }
    };

    return (
        <div className="container mt-4 shadow bg-white">
            <br />
            <div className="mt-0 ms-3 me-3 mg-5">
                <h1 className="mb-5 fw-bold">{datasetName}</h1>
                <div className="d-flex"><p className="fw-bold me-2">Autor:</p> {author}</div>
                <div className="d-flex"><p className="fw-bold me-2">Fecha de Actualización:</p> {lastUpdated}</div>
                <div className="d-flex mb-3"><p className="fw-bold me-2">Descripción:</p>{description}</div>
                <div className="d-grid gap-2 d-md-block">
                    <button className="btn btn-success" type="button">Descargar Dataset</button>
                    <button className="btn btn-success ms-2" type="button">Generar Informe</button>
                </div>

                {/* Pestañas de Navegación */}
                <ul className="nav nav-tabs mt-3" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === 'visualization' ? 'active' : ''}`}
                            onClick={() => setActiveTab('visualization')}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'visualization'}
                        >
                            Visualización
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === 'statistics' ? 'active' : ''}`}
                            onClick={() => setActiveTab('statistics')}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'statistics'}
                        >
                            Estadísticas
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === 'comments' ? 'active' : ''}`}
                            onClick={() => setActiveTab('comments')}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'comments'}
                        >
                            Comentarios
                        </button>
                    </li>
                </ul>

                {/* Contenido de las Pestañas */}
                <div className="tab-content mt-3">
                    {renderTabContent()}
                </div>
            </div>
            <br />
        </div>
    );
}

export default DatasetView;
