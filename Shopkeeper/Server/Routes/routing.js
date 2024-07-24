const express = require('express');
const authcontroller = require('../controller/auth');

const router = express.Router();


router.post('/login', authcontroller.login);
router.post('/insert', authcontroller.insert);
router.post('/send',authcontroller.send);
router.get('/verify',authcontroller.verify);
router.post('/test',authcontroller.test);
    

module.exports = router;