import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "./authContext";
import './styles/navbar.css'

function NavBar() {
    const { currentUser, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav>
            <Link className="nav-link-home" to="/">Jobly</Link>
            <Link className="nav-link" to="/jobs">Jobs</Link>
            <Link className="nav-link" to="/companies">Companies</Link>
            {currentUser ? (
                <>
                    <Link className="nav-link" to="/profile">Profile</Link>
                    <Link onClick={handleLogout} className="nav-link">Logout</Link>
                </>
            ) : (
                <>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/signup">Signup</Link>
                </>
            )}
        </nav>
    );
}

export default NavBar;
