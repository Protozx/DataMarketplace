import {useState, useEffect} from 'react';
import DatasetCard from './DatasetCard';
import SearchBar from './SearchBar';

interface Dataset {
    id: number;
    nombre: string;
    descripcion: string;
}

const DatasetPage: React.FC = () => {
    
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:8081/users')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
    }, [])


    function handleSearch(query: string) {
        console.log('Buscando:', query);
        // Aquí puedes añadir lógica para buscar datos basados en `query`
    }
    
    

    const datasets: Dataset[] = [
        { id: 1, nombre: 'Dataset 1', descripcion: 'Descripción breve del dataset.' },
        { id: 1, nombre: 'A donnde', descripcion: 'me gprenguto a cada instante' },
        { id: 2, nombre: 'Dataset 2', descripcion: 'Descripción breve del dataset 2.' }
        // Puedes agregar más datasets aquí
    ];

    return (
        <div className='container-fluid'>
            <SearchBar onSearch={handleSearch}/>
            <h3 className='ms-2 mt-3 mb-4'>Resultados de busqueda</h3>
            <div>
                {data.map((d,i) => (
                    <DatasetCard key={i} id={d.id} nombre={d.nombre} descripcion={d.email} />
                ))}
            </div>
        </div>
    );
}

export default DatasetPage;
