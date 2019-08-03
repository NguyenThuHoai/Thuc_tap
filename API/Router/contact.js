var nodemailer =  require('nodemailer'); 
var express = require('express');
var bodyParse = require('body-parser');
var router = express();

var contact = function(des,content){
       var transporter =  nodemailer.createTransport({ 
        service: 'Gmail',
        auth: {
            user: 'hoaint177@gmail.com',
            pass: 'thuhoai123'
        }
    });
    var mainOptions = { 
        from: 'ThuHoai',
        to: des,
        subject: 'Thông báo từ admin',
        text: 'Tài khoản của bạn:' + des +'; password:' +content,
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' +  info.response);
            }
    });
}


module.exports=contact;