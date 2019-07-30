var express = require('express');
var bodyParse = require('body-parser');
var router = express();
var Dept = require('../Models/department.js');

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

router.post('/depts',function(req,res,next){
    console.log(req.body);
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

module.exports=router;