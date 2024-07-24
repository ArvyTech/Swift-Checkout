const mongoose = require('mongoose');
var autoIncrement = require("mongoose-auto-increment");

const conn = mongoose.createConnection(process.env.MONGO_URI);
autoIncrement.initialize(conn);

var customerschema = new mongoose.Schema({
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

    pass:{
        type:String,
        required:true
    },

    orders:{
        type: Array,
        default: []
    },

    token:{
        type: Boolean,
        default: false
    }

})
customerschema.plugin(autoIncrement.plugin, {
    model: "Customers",
    field: "C_id",
    startAt: 10000
  });

const CustomerDB = mongoose.model("Customers", customerschema);

module.exports = CustomerDB;