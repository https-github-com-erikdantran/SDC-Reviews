const mysql = require('mysql2');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'reviews'
})

connection.connect();

module.exports = connection;