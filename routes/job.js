const express=require('express');
//for router
const router=express.Router();
const passport=require('passport');

//use routes
const jobController=require('../controller/job_controller');
router.get('/',jobController.home);
console.log("job routes loaded");

module.exports=router;
