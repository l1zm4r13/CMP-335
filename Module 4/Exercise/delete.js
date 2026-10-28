let mysql = require('mysql2');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "LizMarie~1903",
  database: "mydb_demo"
});

con.connect(function(err) {
  if (err) throw err;
  let sql = "DELETE FROM customers WHERE address = 'Highway 37'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});