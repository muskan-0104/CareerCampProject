//require mongpoose
const mongoose=require('mongoose');
//set connection
mongoose.connect('mongodb://0.0.0.0/career_camp_db');//instead of loaclhost use 0.0.0.0

//connct
const db=mongoose.connection;
//if error in connecting
db.on('error',console.error.bind(console,'Error connecting to db'));
//if server is up and running
db.once('open',function(){
    console.log('Db connection Establishd');
})