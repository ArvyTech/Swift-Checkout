const mongoose = require('mongoose');
var autoIncrement = require("mongoose-auto-increment");

const connectDB = async() => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected:${con.connection.host}`);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = {connectDB, autoIncrement};