import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../pages/register.css';
import { useHistory, Link } from "react-router-dom";



const Register = () => {
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [gst, setgst] = useState("");
    const [shop, setshop] = useState("");
    const [shop_address, setshop_address] = useState("");
    const [aadhar, setaadhar] = useState("");
    const [username, setusername] = useState("");
    const [pass, setpass] = useState("");

    let history = useHistory();

    const submitRegister = (e) => {
        Axios.post("http://localhost:5000/auth/insert", {
            name: name,
            phone: phone,
            email: email,
            gst:  gst,
            shop: shop,
            shop_address : shop_address,
            aadhar: aadhar,
            username: username,
            pass: pass

        }).then((response) => {
            console.log(response.data);
            alert("Successfully Registered");
            history.push({
                pathname: "/login"
          });
        });


    }


    return (
        <div className="register-main"> 
            <div class="registers form">
                <form class="signup-form" action="" method="post">
                <a class="b-btn" target="blank">Swift Checkout&nbsp;<i class="fa fa-coffee"></i></a>
                    <div className="input-containers">    
                        <input class="user-input" type="text" placeholder="NAME" autoComplete = "off" required onChange={(event) => {
                            setname(event.target.value);
                        }} />
                        <input class="user-input" type="text" placeholder="PHONE NUMBER" autoComplete = "off" required onChange={(event) => {
                            setphone(event.target.value);
                        }} />
                        <input class="user-input" type="email" placeholder="EMAIL" autoComplete = "off" required onChange={(event) => {
                            setemail(event.target.value);
                        }} />
                        <input class="user-input" type="text" placeholder="GST NUMBER" autoComplete = "off" required onChange={(event) => {
                            setgst(event.target.value);
                        }} />
                        <input class="user-input" type="text" placeholder="SHOP NAME" autoComplete = "off" required onChange={(event) => {
                            setshop(event.target.value);
                        }} />
                        <input class="user-input" type="text" placeholder="SHOP ADDRESS" autoComplete = "off" required onChange={(event) => {
                            setshop_address(event.target.value);
                        }} />
                        <input class="user-input" type="text" placeholder="ADHAAR NUMBER" autoComplete = "off" required onChange={(event) => {
                            setaadhar(event.target.value);
                        }} />
                        <input class="user-input" type="text" placeholder="USERNAME" autoComplete = "off" required onChange={(event) => {
                            setusername(event.target.value);
                        }} />
                        <input class="user-input" type="password" placeholder="PASSWORD" autoComplete = "off" required onChange={(event) => {
                            setpass(event.target.value);
                        }} />
                    </div>
                    <input class="btn" type="submit" onClick={submitRegister} name="" value="SIGN UP" />

                    <div class="options-02">
                        <p>Already Registered? <a href="#"><Link to="/login">Already register, click to login</Link></a></p>
                    </div>
                </form>
                <br />
                
            </div>
        </div>
    )
}

export default Register