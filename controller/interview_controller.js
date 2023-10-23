const students=require('../models/students');
const interviews=require('../models/interviews');

//get requst to interview page to add new interview 
module.exports.interview=async function(req,res){
    try{
        let student=await students.find({}).sort('-createdAt')
    return res.render('interview',{title:'Create Interview',students:student});
}catch(err){
    console.log("Error",err);
    return;
};
}

//post request from inteerview page to add interview data to databse
module.exports.create=async function(req,res){
    try{
        const text = req.body.student;
        const regex = /\(([^)]+)\)/;
        const match = regex.exec(text);
        console.log("Interview data", req.body)
        let newInt=await interviews.create(
                    {
                        //student is sent with name inside a bracket, we use regex to get the id
                       student:match[1],
                       company_name:req.body.company_name,
                       interview_status:req.body.interview_status,
                       interview_date:req.body.interview_date,
                    });
        
        //push new interview to student table
        let foundStudent=await students.findById(match[1]);
        foundStudent.interview.push(newInt);
        foundStudent.save();

        res.redirect("/#interview");
        }catch(err){
            console.log("Error",err);
            return;
        };
     
}

//update interview detail
module.exports.update=async function(req,res){
    try{
         interviews.findOneAndUpdate(
            { "_id": req.params.id },
            {
              $set: {
                student: req.body.student,
                company_name: req.body.company_name,
                interview_status: req.body.interview_status,
                interview_date: req.body.interview_date,
                result: req.body.result,
              }
            },
            { new: true } // This option returns the updated document
          )
          .then(updatedInterview => {
            // if interview is update and result is Pass, update student status to Placed
            if (updatedInterview && req.body.result=='Pass') {
                students.findOneAndUpdate(
                    {'_id':req.body.student},
                    {$set:{status:'Placed'}},
                    {new:true}).then((newStudent)=>{
                        console.log(newStudent)
                    }).error((err)=>{
                        console.log(err)
                    })
            } else {
                res.redirect('/#interview')
            }
          })
          .catch(error => {
            // Handle errors here
          });
          
        res.redirect('/#interview')
                
        }catch(err){
        console.log("Error",err);
        req.flash('Error','Error occured');
        return;
    }
}
//get request to update page with a form to update interview detail, all fields prefiled
// with existing data
module.exports.updateView=async function(req,res){
    try{
        let interview=await interviews.findById(req.params.id)
        let student=await students.find({}).sort('-createdAt')
    return res.render('interview_update',{title:'Update Interview',interview:interview, students:student});
}catch(err){
    console.log("Error",err);
    return;
};
}

//get request to delete interview
module.exports.delete=async function(req,res){
    try{
        
        let interviewId=req.params.id;
        let studentId=req.body.student;

        await interviews.findByIdAndDelete(interviewId);
        //delete interview detail from student
        await students.findByIdAndUpdate(studentId,{$pull:{interview:interviewId}});
        
        return res.redirect("/#interview");
    }catch(err){
        console.log('Error',err);
        return;
    }
}