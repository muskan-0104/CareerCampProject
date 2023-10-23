const students=require('../models/students');
const interviews=require('../models/interviews');
const CsvParser = require('json2csv').Parser;

// home shows list of student and inerview. We can also update/create/delete both
module.exports.home=async function(req,res){
    try{
        let student=await students.find({}).sort('-createdAt').populate('interview')
        let interview=await interviews.find({}).sort('-createdAt').populate('student')
    
    return res.render('home',{title:'Home',students:student, interviews:interview});
}catch(err){
    console.log("Error",err);
    return;
};
}
// downloads csv report with studeent and interview detail
module.exports.downloadReport=async function(req,res){
    try{
        let student=await students.find({}).sort('-createdAt').populate('interview')
              
        let list_of_students=[]
        // loop over all student and interviews, add student and interview
        student.forEach((student) => {
            console.log("student",student)
            student.interview.forEach((interview)=>{
            const {company_name, interview_date, interview_status, result} = interview
            const {id, name, college, status, dsa_marks, frontend_marks, backend_marks, react_marks}= student;
            list_of_students.push({id, name, college, status, dsa_marks, frontend_marks, backend_marks, react_marks, company_name, interview_date, interview_status, result})
            });
            //if student has no interview then just add student data
            if(!student.interview.length){
            const {id, name, college, status, dsa_marks, frontend_marks, backend_marks, react_marks}= student;
            list_of_students.push({id, name, college, status, dsa_marks, frontend_marks, backend_marks, react_marks})

            }
        })
            //csv field headers
            const csvFields = ['id', 'name', 'college', 'status', 'dsa_marks', 'frontend_marks', 'backend_marks', 'react_marks', 'interview_id', 'company_name', 'interview_date', 'interview_status', 'result']
            const csvParser = new CsvParser({csvFields})
            const csvData = csvParser.parse(list_of_students)

            res.setHeader("Content-Type","text/csv")
            res.setHeader("Content-Disposition","attachment: filename=report.csv")

            res.status(200).end(csvData)
        }catch(err){
    console.log("Error",err);
    return;
};
}