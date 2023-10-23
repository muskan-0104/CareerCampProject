const students=require('../models/students');
const interviews=require('../models/interviews');

module.exports.create=async function(req,res){
    try{
        const text = req.body.student;
        const regex = /\(([^)]+)\)/;
        const match = regex.exec(text);
        console.log("Interview data", req.body)
        let newInt=await interviews.create(
                    {
                       student:match[1],
                       company_name:req.body.company_name,
                       interview_status:req.body.interview_status,
                       interview_date:req.body.interview_date,
                    });
        
        let foundStudent=await students.findById(match[1]);
        foundStudent.interview.push(newInt);
        foundStudent.save();

        res.redirect("/");
        }catch(err){
            console.log("Error",err);
            return;
        };
     
}

module.exports.interview=async function(req,res){
    try{
        let student=await students.find({}).sort('-createdAt')
    return res.render('interview',{title:'Create Interview',students:student});
}catch(err){
    console.log("Error",err);
    return;
};
}

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
            if (updatedInterview && req.body.result=='Pass') {
                students.findOneAndUpdate({'_id':req.body.student},{$set:{status:'Placed'}},
                {new:true}).then((newStudent)=>{console.log(newStudent)}).error((err)=>{console.log(err)})
            } else {
                res.redirect('/')
            }
          })
          .catch(error => {
            // Handle errors here
          });
          
        res.redirect('/')
                
        }catch(err){
        console.log("Error",err);
        req.flash('Error','Error occured');
        return;
    }
}

module.exports.updateView=async function(req,res){
    try{
        let interview=await interviews.findById(req.params.id)
        let student=await students.find({}).sort('-createdAt')
    return res.render('interview_update',{title:'Create Interview',interview:interview, students:student});
}catch(err){
    console.log("Error",err);
    return;
};
}

module.exports.delete=async function(req,res){
    try{
        
        let interviewId=req.params.id;
        let studentId=req.body.student;

        await interviews.findByIdAndDelete(interviewId);
        await students.findByIdAndUpdate(studentId,{$pull:{interview:interviewId}});
        
        return res.redirect("back");
    }catch(err){
        console.log('Error',err);
        return;
    }
}