const express=require('express');
//for router
const router=express.Router();
const passport=require('passport');

//use routes
const studentController=require('../controller/student_controller');
router.get('/create',studentController.student);
router.post('/create',studentController.create);
router.get('/update/:id',studentController.updateView);
router.post('/update/:id',studentController.update);
router.get('/delete/:id',studentController.delete);
console.log("student routes loaded");

module.exports=router;
