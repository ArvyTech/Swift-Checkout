import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import jwt from "jsonwebtoken";
import history from './components/History';

import Home from './pages/Home';
import './theme/variables.css';
import Login from './pages/login';
import Register from './pages/register';
import Verify from './pages/Verify';
import Chart from './pages/Chart';
import React from 'react';


function App(){

  const[data, setData] = useState();
  const[isLogin, setisLogin] = useState();
  const[pass, setPass] = useState(true);
  const[dataCanged, setDataChanged] = useState(true);
  const[SignUpStatus, setSignUpStatus] = useState("none");

  useEffect(()=>{
    setData({
      _id: localStorage.getItem("shopkeeper_id") || "",
      name: localStorage.getItem("shopkeeper_name") || "",
      phone: localStorage.getItem("shopkeeper_phone") || "",
      email: localStorage.getItem("shopkeeper_email") || "",
      username: localStorage.getItem("shopkeeper_username") || "",
      shop_address: localStorage.getItem("shopkeeper_shop_address") || "",
      shop_name: localStorage.getItem("shopkeeper_shop_name") || "",
    });
    setisLogin(localStorage.getItem("isLogin") ||"")
    console.log(data);
  },[dataCanged]);

  function handlelogout(){
    console.log("logout");
    localStorage.clear();
    setDataChanged(!dataCanged);
  }

  function handleSubmit(id, pass){
    login(id, pass);
    setPass(true);
  }

  function login(id, pass, e){
    let bodylogin = {
      email: id,
      pass: pass
    }
    axios.post("http://localhost:5000/auth/login", bodylogin)
    .then((res)=>{
      console.log(jwt.decode(res.data.token));
      var decodedData = jwt.decode(res.data.token);
      localStorage.setItem("token", res.data.token);
      if(res.data.login == 'true'){
        setisLogin(true);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("shopkeeper_id", decodedData["_id"]);
        localStorage.setItem("shopkeeper_name", decodedData["name"]);
        localStorage.setItem("shopkeeper_phone", decodedData["phone"]);
        localStorage.setItem("shopkeeper_email", decodedData["email"]);
        localStorage.setItem("shopkeeper_username", decodedData["username"]);
        localStorage.setItem("shopkeeper_shop_address", decodedData["shop_address"]);
        localStorage.setItem("shopkeeper_shop_name", decodedData["shop_name"]);
        setDataChanged(!dataCanged);
        // redirect to home
        history.push("/home");
        window.location.reload(false);
      }
      else if(res.data.login == 'redirect'){
        setisLogin(false);
        localStorage.setItem("isLogin", false);
        localStorage.setItem("shopkeeper_id", decodedData["_id"]);
        localStorage.setItem("shopkeeper_name", decodedData["name"]);
        localStorage.setItem("shopkeeper_phone", decodedData["phone"]);
        localStorage.setItem("shopkeeper_email", decodedData["email"]);
        localStorage.setItem("shopkeeper_username", decodedData["username"]);
        localStorage.setItem("shopkeeper_shop_address", decodedData["shop_address"]);
        localStorage.setItem("shopkeeper_shop_name", decodedData["shop_name"]);
        setDataChanged(!dataCanged);
        // redirect to verify page!!!
        history.push("/verify");
        window.location.reload(false);
      }
      else{
        setPass(false);
      }
    })
  }

  return(
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            {isLogin == "true" ? (
                <Home 
                  Data = {data}
                  onLogout = {handlelogout}
                />
              ):(
                <Login 
                onSubmit = {handleSubmit}
                pass = {pass}
                />
              )
            }
          </Route>
          <Route exact path="/register">
            {isLogin == "true" ? (
                <Home 
                  Data = {data}
                  onLogout = {handlelogout}
                />
              ):(
                <Register />
              )
            }
          </Route>
          <Route exact path="/verify">
          {isLogin == "false" ? (
                <Verify 
                Data = {data}
                onContinue = {handlelogout}
                />
              ):(<Redirect to="/welcome"/>)
            }
          </Route>
          <Route exact path="/home">
            {isLogin == "true" ? (
                <Home 
                  Data = {data}
                  onLogout = {handlelogout}
                />
              ):(<Redirect to="/login"/>)
            }
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
