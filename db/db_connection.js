const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test"
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db ' + err.message);
    return;
  }
  console.log('Connection established');
});

module.exports = con