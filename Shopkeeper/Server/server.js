const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const connectDB = require('./database/connection');
const UserDB = require('./model/model');
const cors = require('cors');

dotenv.config({path:'config.env'})
const app = express();
const mongoose = require('mongoose');
const Port = process.env.PORT || 8080


connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//app.use(bodyparser.urlencoded({extended:true}))
app.use('/auth', require("./Routes/routing"));




app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});