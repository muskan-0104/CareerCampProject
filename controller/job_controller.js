module.exports.home=async function(req,res){
    try{       
    fetch('https://www.linkedin.com/company/mastercard/jobs/')
    .then((response) => response.text())
    .then((body) => {
        console.log(body);
        res.setHeader("Content-Type", "text/html")
        res.send(body)
    });
    return res.render('job',{title:'job',externalJob:body});
}catch(err){
    console.log("Error",err);
    return;
}
}