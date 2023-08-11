import React, { useState, useContext } from 'react';
import AuthContext from "./authContext";
import { useNavigate } from 'react-router-dom';
import './styles/forms.css'

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData(data => ({ ...data, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/');
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-element">
                    <label className="form-label">Username</label>
                    <input className="form-input" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-element">
                    <label className="form-label">Password</label>
                    <input className="form-input" name="password" type="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit" className="form-button">Login</button>
            </form>
        </div>
    );
}

export default Login;


