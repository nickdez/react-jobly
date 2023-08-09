import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import JoblyRoutes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from './authContext';
import JoblyApi from './api';


export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const initialToken = localStorage.getItem(TOKEN_STORAGE_ID);
  const [token, setToken] = useState(initialToken);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_ID, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_ID);
    }
  }, [token]);

  useEffect(() => {
    async function fetchCurrentUser() {
      if (token) {
        JoblyApi.token = token;

        const username = JoblyApi.getUsernameFromToken();
        const user = await JoblyApi.getUser(username);
        setCurrentUser(user);
      }
    }

    fetchCurrentUser();
  }, [token]);


  const login = async (credentials) => {
    try {
      const token = await JoblyApi.login(credentials);
      setToken(token);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };


  const signup = async (userData) => {
    try {
      const token = await JoblyApi.signup(userData);
      setToken(token);
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
  };

  const updateUser = (updatedData) => {
    setCurrentUser(prevUser => ({
      ...prevUser,
      ...updatedData
    }));
  }

  return (
    <div className="App">
      <Router>
        <AuthContext.Provider value={{ currentUser, updateUser, login, signup, logout }}>
          <NavBar />
          <JoblyRoutes />
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;




