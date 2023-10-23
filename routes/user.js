const express=require('express');
//for router
const router=express.Router();
const passport=require('passport');

console.log("user router loaded");


//loginTask
const user=require('../controller/user_controller');
router.get('/login',user.login);
router.post('/create-session',passport.authenticate(
    'local',
    {
        successRedirect:'/',
        failureRedirect:'/user/login',
        failureMessage: true,
    },
),user.createSession);

router.get('/logout',user.destroySession);


//signupTask
router.get('/signup',user.signup);
router.post('/signup',user.user);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), user.login);


module.exports=router;
