const express= require('express');
const router = express.Router();

const userController= require('../controllers/users_controller');
router.get('/profile',userController.profile);




router.get('/sign-up',userController.Signup);
router.get('/sign-in',userController.Signin);

console.log('user page accessed')
router.post('/create',userController.create)
router.post('/createSession',userController.createSession)
router.post('/sign-out',userController.Signout)
module.exports= router;
