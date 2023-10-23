const mongoose=require('mongoose');
const interviewSchema=mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'students',
    },
    company_name:{
        type:String,
        required:true,
    },
    interview_date:{
        type:Date,
        required:true,
    },
    interview_status:{
        type: String,
        required:true,
    },
    result:{
        type: String
    },
},
{
    timestamps:true,
}
);

const interviews=mongoose.model('interviews',interviewSchema);
module.exports=interviews;