const mongoose=require('mongoose');
const path=require('path');

const userSchema=mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
},
    {
        timestamps:true,
    }
);

const users=mongoose.model('users',userSchema);
module.exports=users;