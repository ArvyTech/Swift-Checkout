import React from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';

const Verify = () => {

    const Send_email = () => {
        Axios.post("http://localhost:5000/auth/send", {
            
        }).then((response) => {
            if(response.data == 'sent')
            {
                document.getElementById("id1").innerHTML = "Email Sent Succesfully";
            }
            else
            {
                document.getElementById("id1").innerHTML = "Some error occured, Please recheck your email ID";
            }
        });
    }


    return(
        <div>
            <div>
                <h1>Please verify your email id first!</h1>
                <button id = "btn1" onClick={Send_email}>Resend Email</button>
                <button id = "btn2"><Link to='/login'>continue</Link></button>
            </div>

            <div>
                <h2 id = "id1"></h2>
            </div>


        </div>
    )

}

export default Verify;