const mongoose=require('mongoose');
const studentSchema=mongoose.Schema({
    batch:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    college:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    dsa_marks:{
        type:Number,
        required:true,
    },
    frontend_marks:{
        type: Number,
        required:true,
    },
    backend_marks:{
        type: Number,
        required:true,
    },
    react_marks:{
        type: Number,
        required:true,
    },
    interview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'interviews',
    }],
},
{
    timestamps:true,
}
);

const students=mongoose.model('students',studentSchema);
module.exports=students;