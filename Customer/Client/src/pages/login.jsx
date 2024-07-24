import React from "react";
import { useState } from "react";
import style from './Login.css';
import { useHistory, Link } from "react-router-dom";
import { css } from "@emotion/react";
import { ScaleLoader} from "react-spinners";
const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
function Login(props) {

    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const history = useHistory();

    function sendData(e){
        props.onSubmit(email, pass, e);
        e.preventDefault();
    }

    return(
    <form action="">
       <main className="Login-container">
           <div className="Login-inner">
                <h1>Swift Checkout</h1>
                <h3>Welcome Back</h3>
                <div className="Login-input-container">
                    <div className="Login-input-inner">
                        <label htmlFor="">E-mail</label>
                        <input type="email" name="" id="" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="Login-input-inner">
                        <label htmlFor="">Password</label>
                        <input type="password" name="" id="" onChange={e => setPass(e.target.value)}/>
                    </div>
                </div>
                {!props.pass ? (<p className="alert">Invalid UserName or Password</p>) : ("")}
           </div>
           <ScaleLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"#2f9e9e"}
                loading={props.loading}
            />
           <div className="Login-button">
                <button onClick={sendData}>Login</button>
           </div>
           <p className="goto-register">Don't have an account?<span><Link to='/signup'>Sign up</Link></span></p>
       </main>
    </form>

    )
}

export default Login;