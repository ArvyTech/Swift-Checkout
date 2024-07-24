const express = require('express');
const authcontroller = require('../controller/auth');

const router = express.Router();
router.post('/insert', authcontroller.insert);
router.post('/test', authcontroller.test);
router.post('/login', authcontroller.login);
router.post('/send', authcontroller.send);
router.get('/verify', authcontroller.verify);

module.exports = router;