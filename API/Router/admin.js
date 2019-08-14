var express = require('express');
var bodyParse = require('body-parser');
var router = express();
var Admin = require('../Models/root_account');
var Staff = require('../Models/staff');
var contact  = require('./contact.js')

router.get('/admins/:id?',function(req, res, next) {
    if (req.params.id) {
        Admin.getAdminByID(req.params.id, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        Admin.getAllAdmin(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwt = require('jsonwebtoken');
let jwtOptions = {};
var auth =require('../_auth/auth');
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'admin';

router.post('/admins/login', function(req, res, next) {
  if(req.body){
  let username = req.body.user_name;
  let passwrd = req.body.password;
  if (username && passwrd) {
    Admin.getAdminByUsername(username,function(err,user){
      console.log(user);
        if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (user[0].password == passwrd) {
      let payload = { id: user.id ,isAdmin:'true'};
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({token: token,username:user[0].user_name,flag:user[0].flag});
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
    })
  }
}});

 var resetPass = function(email,callback){
   return Staff.updateAccountbyAdmin(email,'12345678',callback);
 }

router.post('/admins/reset',auth(),function(req,res,next){
  mails=req.body;
  console.log(req.body);
  mails.forEach(email => {
    resetPass(email,function(err,data){
    if(err){
      res.end(err);
    }
    else{
      contact(email,'12345678');
      res.end(JSON.stringify({msg:'successfully'}));

    }
  });
  })    
})

router.put('/admins/resetpass',function(req,res,next){
  if(req.body){
    console.log(req.body);
  Admin.updateAdmin(req.body.username,req.body.password,function(err,rows){
    if(err){
      res.json(err);
    }
    else{
      res.json({msg:'successfully'});
    }
  })
}})

module.exports=router;




    

