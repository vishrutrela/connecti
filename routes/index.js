const express= require('express');

const router= express.Router();
const homecontroller= require('../controllers/home_controller')
const userrouter= require('./users')
console.log('routes worked')

router.get('/',homecontroller.home);
router.use('/users',require('./users'));
//for any other routes access from here

module.exports= router;


   
