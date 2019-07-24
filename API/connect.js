var sql = require('mysql');
var connect = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'manager_staff'
});
module.exports = connect;	