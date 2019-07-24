var db = require('../connect.js');

var admins = {
	getAllAdmin: function(callback) {
        return db.query("select * from manager_staff.`root-account`", callback);
    },
    getAdminByID:function(id,callback){
    	return db.query("select * from manager_staff.`root-account` where id=?", [id], callback);
    },
    addAdmin:function(admin,callback){
    	return db.query("insert into manager_staff.`root-account`(user_name,password) value(?,?)",[admin.user_name,admin.password],callback);

    },
    deleteAdmin:function(id,callback){
    	return db.query("delete from manager_staff.`root-account` where id=?",[id],callback);
    },
    updateAdmin:function(id,admin,callback){
    	return db.query("update manager_staff.`root-account` set user_name=?, password=?",[admin.user_name,admin.password],[id],callback);
    }
};

module.exports=admins;