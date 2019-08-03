var express = require('express');
var bodyParse = require('body-parser');
var router = express();
var Staff = require('../Models/staff');
var contact = require('../Router/contact.js');
var auth = require('../_auth/auth');
var contact = require('./contact.js');

router.get('/staffs/:id?',auth(),function(req, res, next) {

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

router.get('/staffs/depts/:id?',function(req,res,next){
  if(req.params.id){
    Staff.getStaffOnDept(req.params.id,function(err,rows){
      if(err){
        res.json(err);
      }else{
        res.json(rows);
      }
    })
  }
})

router.get('/staffs/manager/:id?',function(req,res,next){
  if(req.params.id){
    console.log("fsdv");
    Staff.getManager(req.params.id,function(err,rows){
      if(err){
        res.json({msg:'err'});
      }else{
        res.json(rows[0]);
        console.log(rows[0]);
      }
    })
  }
});

router.get('/staffs/persons/depts/:id?',function(req,res,next){
  if(req.params.id){
    console.log("fsdv");
    Staff.getPersonOnDept(req.params.id,function(err,rows){
      if(err){
        res.json(err);
      }else{
        res.json(rows);
      }
    })
  }
})

router.post('/staffs/find',function(req,res,next){
    email = req.body.email;
    if(email){
    Staff.getStaffByEmail(email,function(err,user){
        if (err) {
            res.json(err);
        } else {
            res.json(user[0]);
        }
    })}
});
router.post('/staffs', function(req, res, next) {
    if(req.body){
    Staff.addStaff(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            contact(req.body.email,req.body.password)
            res.json(req.body);
        }
    });}
});

router.delete('/staffs/:id?', function(req, res, next) {
    if(req.params.id){
    Staff.deleteStaff(req.params.id, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });}
});

router.put('/staffs/resetAcc/',function(req,res,next){
    if(req.body){
    console.log(req.body);

    Staff.updateAccount(req.body.id,req.body.password,function(err,rows){
         if (err){
             res.json(err);
         }else{    
             res.json({msg:'successfully'});
             
         }
     })}
});

router.put('/staffs/edit/:id?', function(req, res, next) {
    console.log("abc");
    if(req.params.id&& req.body){
      console.log(req.body);
      console.log("adsa");
    Staff.updateStaff(req.params.id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
          console.log("thành công");
             res.json({msg:'successfully'});
        }
    });}

});

router.put('/staffs/updateManager/',function(req, res, next){
    if(req.body.id){
      Staff.updateManager(req.body.id,function(err,rows){
        if(err){
          res.json(err);
        }else{
          res.json({msg:'successfully'});
        }
      })
    }
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
    if(req.body){
  let email = req.body.email;
  console.log(email);
  let passwrd = req.body.password;
  if (email && passwrd) {
    Staff.getStaffByEmail(email,function(err,user){
        if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (user[0].password == passwrd) {
              console.log(user);
      let payload = { id: user.id,isAdmin:'false' };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({token: token,email:user[0].email,flag:user[0].flag});
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
    })
  }}
});

router.post('/staffs/accuracy', function(req, res, next) {
    if(req.body){
  let email = req.body.email;
  let passwrd = req.body.password;

  if (email && passwrd) {
    Staff.getStaffByEmail(email,function(err,user){
        console.log(user);
        if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (user[0].password == passwrd) {
      console.log(user[0])
        //let payload = { id: user.id,isAdmin:'false' };
      res.json(user[0]);

    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
    })
  }}
});

module.exports=router;