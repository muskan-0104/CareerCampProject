const express=require('express');
//for router
const router=express.Router();
const passport=require('passport');

//use routes
const interviewController=require('../controller/interview_controller');
router.get('/create',interviewController.interview);
router.post('/create',interviewController.create);
router.get('/update/:id',interviewController.updateView);
router.post('/update/:id',interviewController.update);
router.get('/delete/:id',interviewController.delete);
console.log("interview routes loaded");

module.exports=router;
