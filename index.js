const express=require('express');
//for mongoose
const db=require('./config/mongoose');
var MongoStore=require('connect-mongo');
const app=express();
const port=8000;
const flash=require('connect-flash');
const customMiddleware=require('./config/middleware');
//for reading url encoded values
app.use(express.urlencoded());
//layout setup
const layouts=require('express-ejs-layouts');
//using layouts always before router
app.use(layouts);
//extracting styles and scrips from sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//for static files
app.use(express.static('./assets'));
//for view or .ejs files
app.set('view engine','ejs');
app.set('views','./views');//property set for template

//user authentication
const expressSession=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport');
//for passport jwt
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle= require('./config/passport-google-oauth2-strategy');
const cookieParser=require('cookie-parser');
app.use(cookieParser());

app.use(expressSession({
    name:'interview',
    //need to give proper secret
    secret:'blabla',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({ mongoUrl: 'mongodb://0.0.0.0/career_camp_db'})
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//for showing flash msgs
app.use(flash());
app.use(customMiddleware.setFlash);
//use routes
app.use('/',require('./routes'));//by deafault it fetches index.js itself so no need to mention 


app.listen(port,function(err){
    if(err){
    console.log(`Error starting server:${err}`);
    }
console.log(`Server started on port: ${port}`);
});