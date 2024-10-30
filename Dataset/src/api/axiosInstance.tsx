// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081', // Cambia esto según la URL de tu backend
    withCredentials: true, // Esto permite que Axios envíe cookies con cada solicitud
});

export default axiosInstance;
