import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import ReactModal from "react-modal";

function Scan(props) {

    const [data, setData] = useState("no data");
    const [txt, setTxt] = useState("data");
    const [apiData, setApiData] = useState()
    const [barCodeScanner, setBarCodeScanner] = useState("");
    const [qrCodeScanner, setQrCodeScanner] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [locationDetails, setLocationDetails] = useState("");
    const [productData, setProductData] = useState({name:"",price:0,quantity: 0,barcode:"",totalPrice:0});
    ReactModal.setAppElement('#root');

    function barcodeScan() {
        document.getElementById("scann-btn").style.display = "none";
        document.getElementById("scann-btn1").style.display = "none";
        document.getElementById("qrcode-cam").style.display = "none";
        document.getElementById("barcode-cam").style.display = "block";
        setBarCodeScanner(<BarcodeScannerComponent
            width={375}
            height={500}
            onUpdate={(err, result) => {
                if (result){
                    setData(result.text);
                    setProductDetail(result.text);
                    setShowModal(true);
                }
                else setTxt("Not Found");
            }}
        />);
    }
    function setLocationScan() {
        document.getElementById("scann-btn").style.display = "none";
        document.getElementById("barcode-cam").style.display = "none";
        document.getElementById("scann-btn1").style.display = "none";
        document.getElementById("qrcode-cam").style.display = "bolck";
        setQrCodeScanner(<BarcodeScannerComponent
            width={375}
            height={500}
            onUpdate={(err, result) => {
                if (result){
                    setShowLocationModal(true);
                    setLocationDetails(JSON.parse(result.text));
                }
            }}
        />);
    }
    function setProductDetail(bardata) {
        if(bardata==2549281)
        {
            setProductData({
                name:"abc",
                price:123,
                quantity: 1,
                barcode: bardata,
                totalPrice:123
            })
        }
        else if(bardata==89416549)
        {
            setProductData({
                name:"abc",
                price:123,
                quantity: 1,
                barcode: bardata,
                totalPrice:123
            })
        }
        else if(bardata==81865841)
        {
            setProductData({
                name:"abc",
                price:123,
                quantity: 1,
                barcode: bardata,
                totalPrice:123
            })
        }
        else{
            setProductData({
                name: "Classmate Exercise Book (27 X 16)",
                price: 65,
                quantity: 1,
                barcode: 8901030717376,
                totalPrice: 65
            })
        }
    }
    function handleCloseModal () {
        setShowModal(false);
        setShowLocationModal(false);
    }
    function addToCart() {
        if(window.localStorage.getItem("user-cart-data"))
        {
          var temp = JSON.parse(window.localStorage.getItem("user-cart-data"));
          temp.push(productData);
          console.log("in if");
          console.log(temp);
          window.localStorage.setItem("user-cart-data", JSON.stringify(temp));
          console.log(JSON.parse(window.localStorage.getItem("user-cart-data")));
        }
        else{
          var temp = [];
          temp.push(productData);
          console.log("in else");
          console.log(temp);
          window.localStorage.setItem("user-cart-data",JSON.stringify(temp))
          console.log(JSON.parse(window.localStorage.getItem("user-cart-data")));
        }
        setProductData({
            name:"",
            price:0,
            quantity:1,
            barcode:"",
            totalPrice:0
        })
        setShowModal(false);
    }
    function selectLocation() {
        window.localStorage.setItem("user-store-location",JSON.stringify(locationDetails))
        setShowLocationModal(false);
    }
    function increment(){
        if(productData.quantity<10){
            setProductData({
                name:productData.name,
                price:productData.price,
                barcode:productData.barcode,
                quantity:(productData.quantity+1),
                totalPrice: ((productData.quantity+1)*productData.price)
            });
        }
    }
    function decrement(){
        if(productData.quantity>1){
            setProductData({
                name:productData.name,
                price:productData.price,
                barcode:productData.barcode,
                quantity:(productData.quantity-1),
                totalPrice: ((productData.quantity-1)*productData.price)
            });
        }
    }
    return(
        <div className="scan-main">
            <button id="scann-btn1" onClick={setLocationScan}>Set Location</button>
            <h1></h1>
            <h1></h1>
            <button id="scann-btn" onClick={barcodeScan}>Scan Product</button>
            <div id="barcode-cam" style={{display: "none"}}>
                {barCodeScanner}
            </div>
            <div id="qrcode-cam" >
                {qrCodeScanner}
            </div>
            
            <ReactModal className="product-modal" isOpen={showModal}>
                <h3>
                    Name: {productData.name}
                </h3>
                <h3>
                    Price: {productData.price}
                </h3>
                <h3>
                    BarCode: {productData.barcode}
                </h3>
                <h3>
                    Quantity: <button className="counter" onClick={decrement}>-</button> {productData.quantity} <button  className="counter" onClick={increment}>+</button>
                </h3>
                <h3>
                    Total Amount: {productData.totalPrice}
                </h3>
                <div className="modal-btn">
                    <button onClick={addToCart}>Add to Cart</button>
                    <button onClick={handleCloseModal}>Cancel</button>
                </div>
            </ReactModal>

            <ReactModal className="location-modal" className="product-modal" isOpen={showLocationModal}>
                <h3>
                    Store Name: {locationDetails.name}
                </h3>
                <h3>
                    store Location: {locationDetails.Address}
                </h3>
                <h3>
                    Store ID: {locationDetails.id}
                </h3>
                <div className="modal-btn">
                    <button onClick={handleCloseModal}>Cancle</button>
                    <button onClick={selectLocation}>Select</button>
                </div>
            </ReactModal>
        </div>

    )
}

export default Scan;