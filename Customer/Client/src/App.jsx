import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import jwt from "jsonwebtoken";
import { useHistory } from 'react-router';
import history from './components/History';

import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Verify from './pages/Verify';
import Test from './pages/Test';
import Cart from './components/Cart';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

function App(){

  const[data, setData] = useState();
  const[isLogin, setisLogin] = useState();
  const[loading, setLoading] = useState(false);
  const[pass, setPass] = useState(true);
  const[dataCanged, setDataChanged] = useState(true);
  const[SignUpStatus, setSignUpStatus] = useState("none");
  useEffect(()=>{
    setData({
      _id: localStorage.getItem("customer_id") || "",
      name: localStorage.getItem("customer_name") || "",
      phone: localStorage.getItem("Customer_phone") || "",
      email: localStorage.getItem("customer_email") || "",
      c_id: localStorage.getItem("customer_c_id") || "",
    });
    setisLogin(localStorage.getItem("isLogin") ||"")
  },[dataCanged]);

  function handlelogout(){
    console.log("logout");
    localStorage.clear();
    setDataChanged(!dataCanged);
  }

  function handleSubmit(id, pass){
    setLoading(true);
    login(id, pass);
    setPass(true);
  }

  function login(id, pass, e){
    let bodylogin = {
      email: id,
      pass: pass
    }
    axios.post("http://localhost:8080/auth/login", bodylogin)
    .then((res)=>{
      console.log(jwt.decode(res.data.token));
      var decodedData = jwt.decode(res.data.token);
      localStorage.setItem("token", res.data.token);
      if(res.data.login == 'true'){
        setLoading(false);
        setisLogin(true);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("customer_id", decodedData["_id"]);
        localStorage.setItem("customer_name", decodedData["name"]);
        localStorage.setItem("customer_phone", decodedData["phone"]);
        localStorage.setItem("customer_email", decodedData["email"]);
        localStorage.setItem("customer_c_id", decodedData["c_id"]);
        setDataChanged(!dataCanged);
        // redirect to home
        history.push("/home");
        window.location.reload(false);
      }
      else if(res.data.login == 'redirect'){
        setLoading(false);
        setisLogin(false);
        localStorage.setItem("isLogin", false);
        localStorage.setItem("customer_id", decodedData["_id"]);
        localStorage.setItem("customer_name", decodedData["name"]);
        localStorage.setItem("customer_phone", decodedData["phone"]);
        localStorage.setItem("customer_email", decodedData["email"]);
        localStorage.setItem("customer_c_id", decodedData["c_id"]);
        setDataChanged(!dataCanged);
        // redirect to verify page!!!
        history.push("/verify");
        window.location.reload(false);
      }
      else{
        setPass(false);
        setLoading(false);
      }
    })
  }

  function handleSignup(signupCred){
    axios.post("http://localhost:8080/auth/insert", signupCred)
    .then((res) => {
      
      setSignUpStatus(res.data.status);
      console.log(SignUpStatus);
      if(SignUpStatus == 'success'){
        // redirect to login page
        console.log("successfully added");
        history.push("/login");
        window.location.reload(false);
      }
    })
  }


  return(   
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>

          <Route exact path="/welcome">
            {isLogin == "true" ? (<Redirect to = "/home"/>):(<Welcome/>)}
          </Route>

          <Route exact path="/">
            <Redirect to="/welcome" />
          </Route>

          <Route exact path="/home">
            {isLogin == "true" ? (
                <Home 
                  Data = {data}
                  onLogout = {handlelogout}
                />
              ):(<Redirect to="/welcome"/>)
            }
          </Route>

          <Route exact path="/cart">
            {isLogin == "true" ? (
                <Cart 
                  onLogout = {handlelogout}
                />
              ):(<Redirect to="/welcome"/>)
            }
          </Route>

          <Route exact path="/login">
            {isLogin == "true" ? (
                <Home 
                  Data = {data}
                  onLogout = {handlelogout}
                />
              ):(
                <Login 
                onSubmit = {handleSubmit}
                loading = {loading}
                pass = {pass}
                />
              )
            }
          </Route>

          <Route exact path="/signup">
            {isLogin == "true" ? (
                <Home 
                  Data = {data}
                  onLogout = {handlelogout}
                />
              ):(
                <Signup 
                onSubmit = {handleSignup}
                status = {SignUpStatus}
                />
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

          <Route exact path="/Test">
            <Test />
          </Route>

          <button >Hello</button>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
