import React, { useState } from "react";
import style from './Signup.css';
import { useHistory, Link } from "react-router-dom";


function Signup(props) {

    const history = useHistory();

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();

    function handlesignup(e) {

        e.preventDefault();
        let signupCred = {
            name: name,
            phone: phone,
            email: email,
            pass: pass
        }
        props.onSubmit(signupCred);
    }

    return(
    <form action="">
        <main className="signup-container">
                <h1>Swift-Checkout</h1>
                <h3>Sign Up</h3>
                <div className="signup-input-container">
                    <div className="signup-input-inner">
                        <label htmlFor="">Name</label>
                        <input type="Name" name="" id="1" onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="signup-input-inner">
                        <label htmlFor="">Phone Number</label>
                        <input type="number" name="" id="2" onChange={e => setPhone(e.target.value)}/>
                    </div>
                    <div className="signup-input-inner">
                        <label htmlFor="">Email</label>
                        <input type="email" name="" id="3" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="signup-input-inner">
                        <label htmlFor="">Password</label>
                        <input type="password" name="" id="4" onChange={e => setPass(e.target.value)}/>
                    </div>
                </div>
                <button className="signup-button" onClick={handlesignup}>Sign up</button>
                <p className="goto-login">Already have an account?<span><Link to='/login'>Sign In</Link></span></p>
        </main>
        {props.status == 'email' ? (<p className="alert">This Email is already registered with us!</p>) 
            : props.status == "phone" ? (<p className="alert">This Phone Number is already registered with us!</p>)
            : props.status == "phone&email" ? (<p className="alert">This Phone Number and Email is already registered with us!</p>):("")}
    </form>
    )
}

export default Signup;