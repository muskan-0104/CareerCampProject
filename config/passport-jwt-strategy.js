const { model } = require('mongoose');
const users=require('../models/users');
const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    users.findById(jwtPayLoad._id).catch((err)=>{
        console.log(err);
            return;
    }).then((user)=>{
        if(user){
            console.log(user);
            return done(null,user);
        }
        else
        return done(null,false);
    })

        
    }));

module.exports=passport;