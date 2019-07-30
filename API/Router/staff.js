var express = require('express');
var bodyParse = require('body-parser');
var router = express();
var Staff = require('../Models/staff');

router.get('/staffs/:id?', function(req, res, next) {
    if (req.params.id) {
        Staff.getStaffById(req.params.id, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        Staff.getAllStaff(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.post('/staffs/find',function(req,res,next){
    email = req.body.email;
    Staff.getStaffByEmail(email,function(err,user){
        if (err) {
            res.json(err);
        } else {
            res.json(user[0]);
        }
    })
})
router.post('/staffs', function(req, res, next) {
    Staff.addStaff(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/staffs/:id', function(req, res, next) {
    Staff.deleteStaff(req.params.id, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/staffs/:id', function(req, res, next) {
    Staff.updateStaff(req.params.id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.put('/staffs/resetAcc',function(req,res,next){
    password = req.body.email;
    console.log(password);
    Staff.updateAccount(password,function(err,rows){
        console("đây");
        console.log(rows);
        console.log("đây");
        if (err){
            res.json(err);
        }else{    
            res.json({msg:'successfully'});
        }
    })
})

var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwt = require('jsonwebtoken');
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'staff';


router.post('/staffs/login', function(req, res, next) {
  let email = req.body.email;
  let passwrd = req.body.password;
  if (email && passwrd) {
    Staff.getStaffByEmail(email,function(err,user){
        if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (user[0].password == passwrd) {
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({token: token,email:user[0].email});
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
    })
  }
});


router.post('/staffs/accuracy', function(req, res, next) {
  let email = req.body.email;
  let passwrd = req.body.password;
  if (email && passwrd) {
    Staff.getStaffByEmail(email,function(err,user){
        if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (user[0].password == passwrd) {
      res.json({msg:'Tài khoản hợp lệ'})
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
    })
  }
});




module.exports=router;