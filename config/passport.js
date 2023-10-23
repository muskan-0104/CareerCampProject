const users=require('../models/users');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,//added so that we can pass req parameter to below fucntion
    },
    function(req,email,password,done){
        //find user
        users.findOne({email:email}).catch((err)=>{
            console.log('User not found');
            req.flash('error','User not found!');
            return done(err);
        }).then((user)=>{
            if(!user || user.password!=password)
            {
                console.log('Invalid Username/Password');
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        })
    }

));

//serializing the user to check whick keey to keep in cookie
passport.serializeUser(function(user,done){
    console.log('serialized');
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    users.findById({_id:id}).catch((err)=>{
        console.log("Error finding user");
        return done(err);
    }).then((user)=>{
        console.log("user deserializd ",user);
        return done(null,user);
    })
});

//check if user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if user is signed in pass request to next function(controller's action)
    if(req.isAuthenticated()){
        return next()
    }

    //if user is not signed in
    return res.redirect('/user/login');

}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains currently signed in user, we will set it for response local
        res.locals.user=req.user;
    }
    return next();
}

module.exports=passport;