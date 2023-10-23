const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "76288051558-dtidekonmm2gv0gjtc00edodocn9kbrq.apps.googleusercontent.com", // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
        clientSecret: "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", // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: "http://localhost:8000/user/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).then((user)=>{
            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                    tagline:"",
                    description:"",
                    website:"",
                    avatar:"",
                }).then((user)=>{
                    return done(null, user);
                }).catch((err)=>{
                    console.log('error in creating user google strategy-passport', err); 
                    return;
                });
                    
            }

        }).catch((err)=>{
            console.log('error in google strategy-passport', err);
            console.log(accessToken, refreshToken);
            console.log(profile);
            return;
        });

    }


));


module.exports = passport;
