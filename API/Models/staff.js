var db = require('../connect.js');

var staffs = { 
    getAllStaff: function(callback) {
        return db.query("Select id,full_name, password,email, staff.address,gender,birthday,grade,department_name from staff,department where staff.id_department=department.id_department", callback);
    },
    getStaffById: function(id, callback) {
        return db.query("select id,full_name, password,email, staff.address,gender,birthday,grade,department_name from staff,department where staff.id_department=department.id_department and staff.id=?", [id], callback);
    },
    getStaffByEmail:function(email,callback){
        return db.query("select * from staff,department where staff.id_department=department.id_department and staff.email = ?", email,callback);
    },
    addStaff: function(staff, callback) {
        return db.query("insert into staff(full_name, password,email, address,gender,birthday,grade,id_department)  values(?,?,?,?,?,?,?,?)", 
            [staff.full_name, staff.password,staff.email, staff.address, staff.gender,staff.birthday,staff.grade,staff.id_department], callback);
    },
    deleteStaff: function(id, callback) {
        return db.query("delete from staff where id=?", [id], callback);
    },
    updateStaff: function(id, staff, callback){
        return db.query("update staff set full_name=?, password=?, address=?,gender=?,birthday=?,grade=?,id_department=?", 
            [staff.fullname, staff.password, staff.address, staff.gender,staff.birthday,staff.grade,staff.id_department], callback);
    },
    updateAccount:function(password,callback){
       return db.query("update staff set password=?",password,callback);
    }
};
    
module.exports = staffs;
