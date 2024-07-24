import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import history from '../components/History';
import Scan from '../components/Scan';
import { useState } from 'react';

function Home(props){
  function goToHome(){
    document.getElementById("barcode-cam").style.display = "none";
    document.getElementById("qrcode-cam").style.display = "none";
    document.getElementById("scann-btn").style.display = "block";
    document.getElementById("scann-btn1").style.display = "block";
    window.location.reload(false);
  }
  function goToCart() {
    history.push("/cart");
    window.location.reload(false);
  }
  return(
    <main className="home-main"> 
        <div className="home-main-inner">
            <Scan data="" />
        </div>
        <nav className="home-nav">
         <button onClick={goToHome}><i className="material-icons">home</i></button>
         <button onClick={goToCart}><i className="material-icons">shopping_cart</i></button>
         <button><i className="material-icons">history</i></button>
         <button onClick={props.onLogout}><i className="material-icons">person_outline</i></button>
        </nav>
    </main>
     )
};

export default Home;
