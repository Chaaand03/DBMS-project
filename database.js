var mysql = require("mysql");

var connection = mysql.createConnection({
    host:'localhost',
    database: 'sjce_placement',
    user: 'root',
    password: 'mysql123'
})

module.exports = connection;