var CustomerDB = require('../Model/model');
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

            const Customer = new CustomerDB({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                pass: hashedPass
            })
            CustomerDB.find({email:req.body.email})
            .then(user => {
                if(user.length != 0)
                {
                    CustomerDB.find({phone: req.body.phone})
                    .then((doc)=>{
                        if(doc.length != 0){
                            res.send({status: "phone&email"});
                        }
                        else{
                            res.send({status: "email"});
                        }
                    })
                }
                else{
                    CustomerDB.find({phone: req.body.phone})
                    .then(user => {
                        if(user.length != 0){
                            res.send({status: "phone"});
                        }
                        else{
                            Customer
                            .save(Customer)
                            .then(data => {
                                console.log(data);
                                res.send({status: "success"});
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message:err.message || "Some Error occured while creating a create operation"
                                });
                            });
                        }
                    })
                }
            })
        }
    })
}

exports.login = function (req, res){
    var email = req.body.email;
    var password = req.body.pass;

    CustomerDB.findOne({email: email})
        .then(user => {
            if(user){    
                bcrypt.compare(password, user.pass, function(err, result) {
                    if(err){
                       console.log(error);
                    }

                    if(result){
                        cust = {
                            _id: user._id,
                            name: user.name,
                            phone: user.phone,
                            email: user.email,
                            c_id: user.C_id,
                        };

                        let token = jwt.sign(cust, 'verySecretValue', {expiresIn: '30m'})
                        console.log(token);
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

exports.send = function(req, res)
{
    const email = req.body.email;
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    console.log(host);
    link="http://"+req.get('host')+"/auth/verify?id="+rand;
    mailOptions={
    to : email,
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
            res.sendFile(__dirname + "/Verified.html");
            //res.send("<h1>Email "+mailOptions.to+" is been Successfully verified"); 
            
            CustomerDB.findOneAndUpdate({email: mailOptions.to}, {token: true}).then(res => {
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
    console.log(req.body);
    res.send(req.body);
}