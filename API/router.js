var express = require('express');
var bodyParse = require('body-parser');
var router = express();
var Staff = require('./Models/staff');
var Admin = require('./Models/root_account');
var Dept = require('./Models/department');

router.use(bodyParse.urlencoded({ extended: true }));
router.use(bodyParse.json());

//staff
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

router.post('/staffs/', function(req, res, next) {
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

//admin
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


//department
router.get('/depts/:id?',function(req,res,next){
    if(req.params.id){
           Dept.getDeptById(req.params.id,function(err,rows){
               if(err){
                   res.json(err);
               }else{
                   res.json(rows);
               }
           });
    }else{
        Dept.getAllDept(function(err,rows){
            if(err){
                res.json(err);
            }else{
                res.json(rows);
            }
        });
    }
});

router.post('/depts/',function(req,res,next){
    Dept.addDept(req.body,function(err,rows){
        if(err){
            res.json(err);
        }else{
            res.json(res.body);
        }
    })
});

router.delete('/depts/:id',function(req,res,next){
    Dept.deleteDept(req.params.id,function(err,count){
        if (err) {
            res.json(err);
        }else{
            res.json(count);
        }
    });
});

router.put('/depts/:id',function(req,res,next){
    Dept.updateDept(req.params.id,req.body,function(err,rows){
        if(err){
            res.json(err);
        }else{
            res.json(rows);
        }
    });
});

module.exports = router;
