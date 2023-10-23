const users=require('../models/users');

//signup
module.exports.signup=function(req,res){
    
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signup',{title:'Sign Up',err:req.query.err});
}

//create user after signup redirect
module.exports.user=async function(req,res){
    //check if email alrady exists
    let email=await users.findOne({email:req.body.email});
    if(email==null)
    {
        req.flash('error',"Email already exists");
        return res.redirect("/user/signup");
    }
    
   else
    {

        users.uploadedAvatar(req,res,function(err)
        {
            if(err){console.log('***Multer Error',err);}
            //if usr has uploaded a file
            if(req.file){
                users.create({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                }).catch((err)=>{
                        console.log("Error while creating record",err);
                    }).then((newUser)=>{
                        console.log("New user signed up ",newUser);
                    });
                }
                else{
                    users.create({
                        name:req.body.name,
                        email:req.body.email,
                        password:req.body.password,
                    }).catch((err)=>{
                        console.log("Error while creating record");
                    }).then((newUser)=>{
                        console.log("New user signed up ",newUser);
                    });
                }
            });
            
            res.redirect("/user/login");
        }
        
}

//login
module.exports.login=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('login',{title:'LogIn'});
}

module.exports.createSession=function(req,res){
    req.flash('success','Logged In Successfully');
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.redirect('/');
}
//logout
module.exports.destroySession=function(req,res){
    req.logout(function(){
        console.log('logout');
    });
    req.flash('success','Logged Out Successfully');
    return res.redirect('/');
}