const { response } = require("express");
var Userdb = require('../model/model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'swiftcheckoutofficial@gmail.com',
        pass: 'swiftcheckout'
    }
});



exports.insert = function(req, res){

    bcrypt.hash(req.body.pass, 10, function(err, hashedPass) {
        if(err){
            res.json({
                error: err
            })
        } 
        else{

            const user = new Userdb({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                gstID: req.body.gst,
                shop_name: req.body.shop,
                shop_address: req.body.shop_address,
                aadhar: req.body.aadhar,
                username: req.body.username,
                pass: hashedPass
            })
            user
                .save(user)
                .then(data => {
                    console.log(data);
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:err.message || "Some Error occured while creating a create operation"
                    });
                });
        }
    })


}

exports.login = function (req, res){
    
    var username = req.body.email;
    var password = req.body.pass;
    
    Userdb.findOne({username: username})
        .then(user => {
            if(user){  
                bcrypt.compare(password, user.pass, function(err, result) {
                    if(err){
                       console.log(error);
                    }

                    if(result){
                        userData = {
                            _id: user._id,
                            name: user.name,
                            phone: user.phone,
                            email: user.email,
                            username: user.username,
                            shop_address: user.shop_address,
                            shop_name: user.shop_name,
                        };

                        let token = jwt.sign(userData, 'verySecretValue', {expiresIn: '30m'})
                        console.log(user.token);
                        console.log(user);
                        if(user.token){
                            res.send({
                                login: 'true',
                                token: token
                            })
                        }

                        else
                        {
                            res.send({
                                login: 'redirect',
                                token: token
                            })
                        }
                    }
                    else{
                        res.send({
                            message: "Password do not matched!"
                        })
                    }
                })
            }
            else{
                res.send({
                    message: "No User found!"
                })
            }
            
        })
        

}


var rand,mailOptions,host,link;


exports.send = function(req, res){
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    console.log(host);
    link="http://"+req.get('host')+"/auth/verify?id="+rand;
    mailOptions={
    to : "amanv.khatri@gmail.com",
    subject : "Please confirm your Email account",
    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send('error');
        }
        else {
            console.log('Email sent: ' + info.response);
            res.send('sent');
        }
    });

}

    
exports.verify = function(req,res){
    console.log(req.query.id);
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+'://'+req.get('host'))==('http://'+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
            console.log("email is verified");
            res.send("<h1>Email "+mailOptions.to+" is been Successfully verified");
            
            Userdb.findOneAndUpdate({email: mailOptions.to}, {token: true}).then(res => {
                console.log(res);
            });
                
        }
        else
        {
            res.end("<h1>Bad Request</h1>");
        }
    }
    
    else
    {
        res.end("<h1>Request is from unknown source");
    }

}
    
exports.test = (req,res) => {

}
    


