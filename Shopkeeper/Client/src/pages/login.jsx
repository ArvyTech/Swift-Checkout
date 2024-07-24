import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../pages/login.css';
import { useHistory, Link } from "react-router-dom";



const Login = (props) => {
    const [username, setusername] = useState("");
    const [pass, setpass] = useState("");   
    
    const history = useHistory();

    const submitLogin = (e) => {
        e.preventDefault();
        console.log(username,pass);
        Axios.post("http://localhost:5000/auth/login", {
            username: username,
            pass: pass
        }).then((response) => {
            console.log(response.data);
            if(response.data.login == "redirect")
            {
                history.push({
                    pathname: '/Verify'
              });
            }
            else if(response.data.login == "true")
            {
                history.push({
                    pathname: '/home'
              });
            }
            else{
                document.getElementById("invalid").innerHTML = 'wrong username or password';
            }
        });

    }

    function sendData(e){
        console.log("in send data");
        props.onSubmit(username, pass);
        e.preventDefault();
    }

    return (
        <div className="login-main">
            <div class="form">
      			<form class="login-form" action="" method="post">
                    <a class="b-btn" target="blank">Swift Checkout&nbsp;<i class="fa fa-coffee"></i></a>
                    <br /><br /><br /><br />
        			<i class="fas fa-user-circle"></i>
					<p>Please enter your credentials to login.</p>
                    <br />
        			<input class="user-input" type="text" name="username" placeholder="Username" required onChange={(event) => {
                        setusername(event.target.value);
                    }}/>
        			<input class="user-input" type="password" name="pass" placeholder="Password" required onChange={(event) => {
                        setpass(event.target.value);
                    }}/>
        			<div class="options-01">
          				<label class="remember-me"><input type="checkbox" name="" />Remember me</label>
          				<a href="/forgot">Forgot your password?</a>
        			</div>
                    <br />
                    <br />
					<input class="btn" type="submit" onClick = {sendData} name="" value="LOGIN" />
        			<div class="options-02">
						<p>Not Registered? <a href="#"><Link to="/register" id="Link">Not registered? Create an account</Link></a></p>
					</div>
      			</form>
                {!props.pass ? (<p className="alert">Invalid UserName or Password</p>) : ("")}
				<h1 id="invalid"></h1>
      			<br/>
    		</div>
        </div>
    )
}

export default Login