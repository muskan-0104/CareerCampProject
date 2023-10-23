//get request to external job page shows mastercard jobs from linkedin
module.exports.home=async function(req,res){
    try{      
    //getting the external job from link
    fetch('https://www.linkedin.com/company/mastercard/jobs/')
    .then((response) => response.text())
    .then((body) => {
        console.log(body);
        //sending response as html
        res.setHeader("Content-Type", "text/html")
        res.send(body)
    });
    return res.render('job',{title:'job',externalJob:body});
}catch(err){
    console.log("Error",err);
    return;
}
}