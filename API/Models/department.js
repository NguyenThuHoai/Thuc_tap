var db = require("../connect.js");
var sql = function(id){
	db.query("delete from staff where staff.id_department=id");
}
var departments = {
	getAllDept:function(callback){
		return db.query("select * from department",callback);
	},
	getDeptById:function(id,callback){
		return db.query("select * from department where id_department=?",[id],callback);
	},
	addDept:function(dept,callback){
		return db.query("insert into department(department_name,address) value(?,?)",[dept.department_name,dept.address], callback);
	},
	deleteDept:function(id,callback){		
		return db.query("delete from department where department.id_department=?",[id],callback);
	},
	deleteStaffOndept:function(id,callback){
		return db.query("delete from staff where staff.id_department=?",[id],callback);
	},
	updateDept:function(id,dept,callback){
		return db.query("update department set department_name=?,address=? where id_department=?",[dept.department_name,dept.address,id], callback);
	}
};

module.exports=departments;