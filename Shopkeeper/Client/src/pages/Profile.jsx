import React, { useEffect, useState } from 'react'

function Profile(props) {
    const [data, Setdata] = useState(props.data);
    console.log(props.data);


    return (
        <div>
            <div className='profile-header'>
                <h1>Profile View</h1>
                <div className="profile-pic"><i class="material-icons">people_alt</i></div>
            </div>
            <div className='profile-container'>
                <label htmlFor="id">Shop ID</label>
                <input type="text" name="id" value={data._id} readOnly/>
                <label htmlFor="shop_name">Shop Name</label>
                <input type="text" name="shop_name" value={data.shop_name} />
                <label htmlFor="name">Handler's Name</label>
                <input type="text" name="name" value={data.name} />
                <label htmlFor="address">Shop's Address</label>
                <input type="text" name="address" value={data.shop_address} />
                <label htmlFor="email">Email ID</label>
                <input type="text" name="email" value={data.email} />
                <label htmlFor="phone">Phone Number</label>
                <input type="text" name="phone" id="phone" value={data.phone} />

                <button id="chngPass" onClick={props.onStart}>Change Password</button>

            </div>
            <button onClick={props.onClose}>Close</button>
        </div>
    )
}

export default Profile
