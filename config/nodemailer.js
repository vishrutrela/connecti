const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path=require('path');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
        user:'vishrutrela@gmail.com',
        pass:'9782103991'
    }

})

let renderTemplate = (data,reletivePath)=>{
    let mailHtml;
    ejs.renderFile(
        path.join(__diranme,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in template rendering');
                return;
            }
            mailHtml=template;
        }
    )
    return mailHtml;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}