import react, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from './home.module.css';
import ReactModal from 'react-modal';
import QRCode from 'qrcode';
import Profile from "./Profile";
import ChangePass from "./ChangePass";

function Home(props) {
    const history = useHistory();
    const [showQrModal, setShowQrModal] = useState(false);
    const [showSaleModal, setShowSaleModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showAmtModal, setShowAmtModal] = useState(false);
    const [showAnalyticsModal, setShowAnalyticModal] = useState(false);
    const [showPassModal, setShowPassModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [QRCodeUrl, setQRCodeUrl] = useState();
    const [data, setData] = useState(props.Data);

    function handleCloseModal () {
        setShowQrModal(false);
        setShowSaleModal(false);
        setShowProfileModal(false);
        setShowAmtModal(false);
        setShowAnalyticModal(false);
        setShowHelpModal(false);
        setShowPassModal(false);
    }
    
    function handleCloseModal2 () {
        setShowPassModal(false);
    }

    function handleShowQrModal(){
        setShowQrModal(true);
        generateQrCode();
    }
    function handleShowPofileModal(){
        setShowProfileModal(true);
    }

    function handleShowPassModal(){
        setShowPassModal(true);
    }

    function generateQrCode(){
        QRCode.toDataURL(`{
            email: ${props.Data.email},
            name: ${props.Data.name},
            phone: ${props.Data.phone},
            shop_address: ${props.Data.shop_address},
            shop_name: ${props.Data.shop_name},
            username: ${props.Data.username},
            _id: ${props.Data._id},
        }`, { errorCorrectionLevel: 'H' }, function (err, url) {
            setQRCodeUrl(url);
          })
    }
    return(
        <div className={styles.home}>
            <nav>
                <div className={styles.navbar}>
                    <h2>Self-Checkout</h2>
                    <div className={styles.navButton}>
                        <h2>{props.Data.name}</h2>
                        <i class="material-icons" onClick={props.onLogout}>logout</i>
                    </div>
                </div>
            </nav>
            <div className={styles.homeMain}>
                <div className={styles.homeMainContainer}>
                    <div className={styles.homeCards} onClick={handleShowQrModal}>
                        <div className={styles.cardIcons}><i class="material-icons">qr_code_scanner</i></div>
                        <h3>QR</h3>
                    </div>
                    <div className={styles.homeCards}>
                        <div className={styles.cardIcons}><i class="material-icons">manage_search</i></div>
                        <h3>Sales History</h3>
                    </div>
                    <div className={styles.homeCards} onClick={handleShowPofileModal}>
                        <div className={styles.cardIcons}><i class="material-icons">people_alt</i></div>
                        <h3>Profile/ Details</h3>
                    </div>
                    <div className={styles.homeCards}>
                        <div className={styles.cardIcons}><i class="material-icons">receipt</i></div>
                        <h3>Amount Due</h3>
                    </div>
                    <div className={styles.homeCards}>
                        <div className={styles.cardIcons}><i class="material-icons">insights</i></div>
                        <h3>Analytics</h3>
                    </div>
                    <div className={styles.homeCards}>
                        <div className={styles.cardIcons}><i class="material-icons">help_outline</i></div>
                        <h3>Helpdesk</h3>
                    </div>


                </div>
            </div>
            <ReactModal className="qr-modal" isOpen={showQrModal}>
                <div>
                    <h1>Shop's QR Code</h1>
                    <div className="qrcode-img-container">
                        <img src={QRCodeUrl} alt="" srcset="" />
                    </div>
                    <button onClick={handleCloseModal}>Close</button>
                </div>
            </ReactModal>
            <ReactModal className="profile-modal" isOpen={showProfileModal}>
                <div>
                    <Profile data ={data} onClose = {handleCloseModal} onStart={handleShowPassModal}/>
                </div>
            </ReactModal>

            <ReactModal className="profile-modal" isOpen={showPassModal}>
                <div>
                    <ChangePass onClose = {handleCloseModal2}/>
                </div>
            </ReactModal>
        </div>
    )
} 


export default Home;