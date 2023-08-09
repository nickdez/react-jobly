import React, { useState, useContext } from 'react';
import { AuthContext } from './authContext';
import './styles/forms.css'

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
    });
    const { signup } = useContext(AuthContext);

    const handleChange = e => {
        setFormData(data => ({ ...data, [e.target.name]: e.target.value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        signup(formData);
    };

    return (
        <div className="form-container">
            <h1>Join Jobly</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-element">
                    <label className="form-label">Username</label>
                    <input className="form-input" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-element">
                    <label className="form-label">Email</label>
                    <input className="form-input" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-element">
                    <label className="form-label">First Name</label>
                    <input className="form-input" name="firstName" value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="form-element">
                    <label className="form-label">Last Name</label>
                    <input className="form-input" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
                <div className="form-element">
                    <label className="form-label">Password</label>
                    <input className="form-input" name="password" type="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit" className="form-button">Signup</button>
            </form>
        </div>
    );
}

export default Signup;
