var db = require('../connect.js');

var admins = {
	getAllAdmin: function(callback) {
        return db.query("select * from manager_staff.`root_account`", callback);
    },
    getAdminByID:function(id,callback){
    	return db.query("select * from manager_staff.`root_account` where id=?", [id], callback);
    },
    getAdminByUsername:function(user_name,callback){
        return db.query("select * from manager_staff.`root_account` where user_name=?", user_name, callback);
    },
    addAdmin:function(admin,callback){
    	return db.query("insert into manager_staff.`root_account`(user_name,password) value(?,?)",[admin.user_name,admin.password],callback);
    },
    deleteAdmin:function(id,callback){
    	return db.query("delete from manager_staff.`root_account` where id=?",[id],callback);
    },
    updateAdmin:function(username,password,callback){
    	return db.query("UPDATE `root_account` SET `user_name` =?, `password` = ?,flag=1 where id=1",[username,password],callback);
    }
};
module.exports=admins; 


