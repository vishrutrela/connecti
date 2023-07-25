const express= require('express');
const passport = require('passport');

const router= express.Router();
const homeController= require('../controllers/home_controller')
// const userrouter= require('./users')
console.log('routes worked')


router.get('/',passport.checkAuthentication,homeController.home);

router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
//for any other routes access from here

router.use('/api',require('./api'));
module.exports= router;



   
