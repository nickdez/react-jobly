import React, { useContext, useState, useEffect } from "react";
import AuthContext from "./authContext";
import { Navigate } from "react-router-dom";
import JoblyApi from "./api";


function Profile() {
    const { currentUser, updateUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ''
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                username: currentUser.username,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
                password: ""
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { username, ...updatedUserData } = formData;
            const updatedUser = await JoblyApi.saveProfile(username, updatedUserData);

            updateUser(updatedUser);
            setError(null);
        } catch (error) {
            setError("Failed to update profile. Please try again.");
            console.error("Failed to update profile:", error);
        }
    }

    if (!currentUser) {
        return <Navigate to="/" />;
    }

    console.log(currentUser);



    return (
        <div className="profile">
            <div className="form-container">
                {error && <p className="error-message">{error}</p>}
                <h1>{currentUser.firstName}'s Jobly Profile</h1>
                <form className="profile-form" onSubmit={handleSubmit}>
                    <div className="form-element">
                        <label className="form-label" htmlFor="username">Username:</label>
                        <input className="form-input"
                            name="username"
                            value={formData.username}
                            id="profile-username"
                            onChange={handleChange} readOnly />
                    </div>
                    <div className="form-element">
                        <label className="form-label" htmlFor="firstName">First name:</label>
                        <input
                            className="form-input"
                            name="firstName"
                            value={formData.firstName} id="first-name" onChange={handleChange} />
                    </div>
                    <div className="form-element">
                        <label className="form-label" htmlFor="lastName">Last name:</label>
                        <input
                            className="form-input"
                            name="lastName"
                            value={formData.lastName}
                            id="last-name"
                            onChange={handleChange} />
                    </div>
                    <div className="form-element">
                        <label className="form-label" htmlFor="email">Email:</label>
                        <input
                            className="form-input"
                            name="email"
                            value={formData.email}
                            id="email"
                            onChange={handleChange} />
                    </div>
                    <div className="form-element">
                        <label className="form-label" htmlFor="password">Password:</label>
                        <input className="form-input" name="password" id="password" type="password" onChange={handleChange} />
                    </div>
                    <button type="submit" className="form-button">Save changes</button>
                </form>
            </div>
        </div>
    )
}

export default Profile;

