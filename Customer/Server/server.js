const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const {connectDB} = require('./database/connection');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');


dotenv.config({path:'config.env'})

connectDB(); 

const Port = process.env.PORT || 8080

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(express.json());
//app.use('/auth', require('./server/routes/auth'));
app.use('/auth', require("./Routes/routing"));


app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});