import React from "react";
import style from './welcome.css';
import { useHistory } from "react-router-dom";

function Welcome() {

    const history = useHistory();

    function gotologin() {
        history.push("/login");
    }

    function gotosignup() {
        history.push("/signup");
    }

    return(

        <div className="welcome-container">
            <div className="welcome-image"></div>
            <div className="welcome-heading">
                <h1>Swift Checkout</h1>
                <p>Stop standing in queue and save your time with our help</p>
            </div>
            <div className="welcome-buttons">
                <button onClick={gotologin}>Login</button>
                <button onClick={gotosignup}>Sign Up</button>
                
            </div>
        </div>

    )
}

export default Welcome;