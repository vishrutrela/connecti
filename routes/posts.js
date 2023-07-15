const express= require('express');
const router= express.Router();
const passport = require('passport');
const postController = require('../controllers/post_controller')
//check authentication is used to prevent post without sign in
router.post('/create',passport.checkAuthentication,postController.create);

module.exports = router;