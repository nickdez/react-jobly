import React, { useContext } from "react";
import './styles/Home.css'
import AuthContext from "./authContext";

function Home() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="home-container">
            {currentUser ? (
                <div className="greeting"><h3>Hello, {currentUser.username}!</h3></div>
            ) : (
                <></>
            )}
            <h1>Welcome to Jobly.</h1>
            <h3>Find your new job today</h3>
        </div>
    )
}

export default Home;
