var db = require('../connect.js');
var staffs = { 
    getAllStaff: function(callback) {
        return db.query("Select id,full_name, password,email, staff.address,gender,birthday,grade,department_name from staff,department where staff.id_department=department.id_department", callback);
    },
    getStaffById: function(id, callback) {
        return db.query("select id,full_name, password,email, staff.address,gender,birthday,grade,department_name,staff.id_department from staff,department where staff.id_department=department.id_department and staff.id=?", [id], callback);
    },
    getStaffByEmail:function(email,callback){
        return db.query("select id,full_name,email, staff.address,gender,birthday,grade,department_name,password,staff.id_department,flag from staff,department where staff.id_department=department.id_department and staff.email= ?", email,callback);
    },
    addStaff: function(staff, callback) {
        return db.query("insert into staff(full_name, password,email, address,gender,birthday,grade,id_department)  values(?,?,?,?,?,?,?,?)", 
            [staff.full_name, staff.password,staff.email, staff.address, staff.gender,staff.birthday,staff.grade,staff.id_department], callback);
    },
    deleteStaff: function(id, callback) {
        return db.query("delete from staff where id=?", [id], callback);
    },
    updateStaff: function(id, staff, callback){
        return db.query("update staff set full_name=?,email=?,address=?,gender=?,birthday=?,grade=?,id_department=? where id =?", 
            [staff.fullName, staff.email, staff.address, staff.gender,staff.birthday,staff.grade,staff.id_department, id], callback);
    },
    updateAccount:function(id,password, callback){
       return db.query("update staff set password=?, flag=1 where id=?",[password,id],callback);
    },
    updateAccountbyAdmin:function(email,password, callback){
       return db.query("update staff set password=?, flag = 0 where email=?",[password,email],callback);
    },
    getManager:function(id,callback){
        return db.query("SELECT id from staff where id_department=? and grade ='Manager'",[id],callback);
    },
    updateManager:function(id,callback){
        return db.query("update staff set grade='Staff' where id=?",[id],callback);
    },
    getStaffOnDept:function(id, callback){
        return db.query("SELECT distinct id,full_name,email,staff.address,gender,birthday,grade,department_name from staff,department where staff.id_department=department.id_department and staff.id_department=? and staff.grade='Staff'",[id],callback);
    },
    getPersonOnDept:function(id, callback){
        return db.query("SELECT distinct id,full_name,email,staff.address,gender,birthday,grade,department_name from staff,department where staff.id_department=department.id_department and staff.id_department=?",[id],callback);
    }
};
    
module.exports = staffs;
