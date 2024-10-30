// src/components/AddDataset.tsx

import React, { useState, useContext, FormEvent } from 'react';
import axiosInstance from './api/axiosInstance';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AddDatasetProps {}

const AddDataset: React.FC<AddDatasetProps> = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [path, setPath] = useState<string>('');
    const [imagePath, setImagePath] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Reset mensajes
        setError('');
        setSuccess('');

        // Validación básica
        if (!title || !date || !description || !tags || !path || !imagePath) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        // Preparar los datos
        const newDataset = {
            user_id: user?.id,
            title,
            date,
            description,
            tags,
            path,
            image_path: imagePath,
        };

        try {
            const response = await axiosInstance.post('/datasets', newDataset);
            if (response.status === 201) {
                setSuccess('Dataset creado exitosamente.');
                // Redirigir o limpiar el formulario
                navigate('/welcome'); // Por ejemplo, redirigir a la página de bienvenida
            }
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Ocurrió un error al crear el dataset.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Nuevo Dataset</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Etiquetas</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tags"
                        placeholder="Separa las etiquetas con comas"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="path" className="form-label">Ruta del Dataset</label>
                    <input
                        type="text"
                        className="form-control"
                        id="path"
                        placeholder="URL o ruta del dataset"
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imagePath" className="form-label">Ruta de la Imagen</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imagePath"
                        placeholder="URL o ruta de la imagen"
                        value={imagePath}
                        onChange={(e) => setImagePath(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Dataset</button>
            </form>
        </div>
    );
};

export default AddDataset;
