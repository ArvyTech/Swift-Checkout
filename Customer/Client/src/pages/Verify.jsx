import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import style from './Verify.css';

function Verify(props) {

    const history = useHistory();
    const email = props.Data.email;
    const [resendEmail, setResendEmail] = useState(true);
    useEffect(() => {
        Axios.post("http://localhost:8080/auth/send", {
          email: email  
        });

    })

    function resend() {
        Axios.post("http://localhost:8080/auth/send", {
          email: email  
        });
    }

    return(

       <main className="verify-main">
           <div className="verify-inner">
            <div className="verify-container">
                <div className="verify-email-logo"><i className="material-icons">email</i></div>
                <h2>Check Your Email</h2>
                <p>To confirm your email address, tap on button in the email we sent to you</p>
                <button onClick={resend}>Resend E-mail</button>
            </div>
            <div className="verify-login">
                <p>Already have an account ?<span onClick={props.onContinue}> Login</span></p>    
            </div>
           </div>
          
       </main>

    )
}

export default Verify;