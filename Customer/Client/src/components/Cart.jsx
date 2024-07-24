import React, { useEffect, useState } from "react";
import history from './History';
import { IonInput } from '@ionic/react';

function Cart(props) {   
    const [cartItem, setCartItem] = useState([]);
    const [cartChange, setCartChange] = useState(false);
    const [locationDetails, setLocationDetails] = useState(JSON.parse(window.localStorage.getItem("user-store-location")))
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        if(JSON.parse(window.localStorage.getItem("user-cart-data"))){
            setCartItem(JSON.parse(window.localStorage.getItem("user-cart-data")));
            var tQuantity = 0;
            var tAmount = 0;
            JSON.parse(window.localStorage.getItem("user-cart-data")).map(item=>{
                tQuantity = tQuantity + item.quantity;
                tAmount = tAmount + item.totalPrice;
            })
            setTotalAmount(tAmount);
            setTotalQuantity(tQuantity);
        }
    }, [cartChange])

    function removeFromCart(deleteItem){
        const filteredItems = cartItem.filter(item => item.barcode !== deleteItem.barcode);
        console.log(filteredItems);
        window.localStorage.setItem("user-cart-data", JSON.stringify(filteredItems));
        setCartChange(!cartChange);
    }
    function goToHome(){
        history.push("/home");
        window.location.reload(false);
    }
    function goToCart() {
        history.push("/cart");
        window.location.reload(false);
    }
    return(
        <div>
            <div className="cart-main">
                <div className="cart-shopping-location"><p>Shopping Location: {(locationDetails != null) ? (locationDetails.name): ("")}</p></div>
                <div className="cart-list-main">
                    <div className="cart-list-heading">
                        <h2>Item Name</h2>
                        <h2>Item Qty.</h2>
                        
                    </div>
                    <div className="cart-list">

                        {cartItem.map(item => (
                            <div>
                                <div className="cart-list-wrapper">
                                    <div className="cart-list-top">
                                        <h2>{item.name}</h2>
                                        <h2>{item.quantity}</h2>
                                    </div>
                                    <div className="cart-list-bottom">
                                        <h3>Rs. {item.price}</h3>
                                        <h3>Rs. {item.totalPrice}</h3>
                                    </div>
                                    <button onClick={(e)=>removeFromCart(item)}>Remove From Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="cart-total">
                    <p>TOTAL QTY: {totalQuantity}</p>
                    <p>TOTAL PRICE: {totalAmount}</p>
                </div>
                <div className="cart-button">
                    <button onClick={goToHome}>Add more</button>
                    <button>Checkout</button>
                </div>
            </div>
            <nav className="home-nav">
                <button onClick={goToHome}><i className="material-icons">home</i></button>
                <button onClick={goToCart}><i className="material-icons">shopping_cart</i></button>
                <button><i className="material-icons">history</i></button>
                <button onClick={props.onLogout}><i className="material-icons">person_outline</i></button>
            </nav>
        </div>
    )
}

export default Cart;