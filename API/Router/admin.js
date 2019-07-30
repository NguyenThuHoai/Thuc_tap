var express = require('express');
var bodyParse = require('body-parser');
var router = express();
var Admin = require('../Models/root_account');

router.get('/admins/:id?', function(req, res, next) {
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
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'admin';

router.post('/admins/login', function(req, res, next) {
  let username = req.body.user_name;
  let passwrd = req.body.password;
  if (username && passwrd) {
    Admin.getAdminByUsername(username,function(err,user){
      console.log(user);
        if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (user[0].password == passwrd) {
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({token: token,username:user[0].user_name});
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
    })
  }
});

module.exports=router;




    

