var  expressJwt = require('express-jwt');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwt = require('jsonwebtoken');
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'admin';

var auth =function () {
		return [expressJwt({"secret":"admin"}),
		function(req,res,next){
			console.log(req.user);
			if(req.user.isAdmin == 'false'){
				res.end('err');
			}
			next();
		}
		]
	}

module.exports=auth;