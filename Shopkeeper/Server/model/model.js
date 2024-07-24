const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },

    phone : {
        type: String,
        required:true,
        unique:true
    },

    
    email:{
        type:String,
        required:true,
        unique:true
    },

    username:{
        type:String,
        required:true,
        unique:true
    },


    pass:{
        type:String,
        required:true
    },

    gstID:{
        type:String,
        required:true,
        unique:true
    },

    shop_address:{
        type:String,
        required:true,
    },

    aadhar:{
        type:String,
        required:true,
        unique:true
    },

    shop_name:{
        type:String,
        required:true,
    },

    token:{
        type: Boolean,
        default: false
    }


})

const UserDB = mongoose.model("Client_register", schema);

module.exports = UserDB;