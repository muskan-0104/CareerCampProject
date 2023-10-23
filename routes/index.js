const express=require('express');
//for router
const router=express.Router();
const passport=require('passport');

//use routes
const homeController=require('../controller/home_controller');
router.get('/',passport.checkAuthentication,homeController.home);
router.get('/download',passport.checkAuthentication,homeController.downloadReport);
router.use('/student',passport.checkAuthentication,require('./student'));
router.use('/interview',passport.checkAuthentication,require('./interview'));
router.use('/job',passport.checkAuthentication,require('./job'));
router.use('/user',require('./user'));
console.log("routes loaded");

module.exports=router;
