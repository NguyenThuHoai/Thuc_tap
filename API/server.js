var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var cors = require('cors');

app.use(cors({origin:'*'}));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
var server = app.listen(3000, function() {
    console.log('Server listening on port ' + server.address().port);
});
module.exports = app;
var connect = require('./connect');
var routes = require('./router');

app.use('/', routes);   