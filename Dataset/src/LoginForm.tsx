import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de instalar axios: npm install axios

function LoginForm() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Estados adicionales para el registro
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isRegistering) {
            // Validar contraseñas
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            try {
                const response = await axios.post('http://localhost:8081/register', {
                    username,
                    email,
                    password
                });
                console.log('Registro exitoso:', response.data);
                alert('Registro exitoso. Puedes iniciar sesión ahora.');
                // Reiniciar los campos y cambiar a modo de inicio de sesión
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setIsRegistering(false);
            } catch (error: any) {
                console.error('Error en el registro:', error.response?.data || error.message);
                alert(`Error en el registro: ${error.response?.data?.message || error.message}`);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:8081/login', {
                    email,
                    password
                });
                console.log('Inicio de Sesión exitoso:', response.data);
                alert('Inicio de sesión exitoso.');
                // Aquí puedes manejar la redirección o almacenamiento de tokens
            } catch (error: any) {
                console.error('Error en el inicio de sesión:', error.response?.data || error.message);
                alert(`Error en el inicio de sesión: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    return (
        <div className="container-fluid m-0">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className={`card flip-card mt-5 ${isRegistering ? 'flip' : ''}`}>
                        <div className="card-body shadow">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${!isRegistering ? 'active' : ''}`}
                                        aria-current="page"
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setIsRegistering(false); }}
                                    >
                                        Iniciar Sesión
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${isRegistering ? 'active text-success' : 'text-success'}`}
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setIsRegistering(true); }}
                                    >
                                        Registrarse
                                    </a>
                                </li>
                            </ul>
                            <form onSubmit={handleSubmit}>
                                {isRegistering && (
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label mt-3">Usuario</label>
                                        <input 
                                            type="text" 
                                            className="form-control custom-input" 
                                            id="username" 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required 
                                        />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label mt-3">Correo electrónico</label>
                                    <input 
                                        type="email" 
                                        className="form-control custom-input" 
                                        id="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input 
                                        type="password" 
                                        className="form-control custom-input" 
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                    />
                                </div>
                                {isRegistering && (
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                                        <input 
                                            type="password" 
                                            className="form-control custom-input" 
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required 
                                        />
                                    </div>
                                )}
                                <button type="submit" className="btn btn-success w-100">
                                    {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
                                </button>
                            </form>
                            {!isRegistering && (
                                <div className="mt-3">
                                    <a href="#" className="text-decoration-none text-success">¿Olvidaste tu contraseña?</a>
                                </div>
                            )}
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
