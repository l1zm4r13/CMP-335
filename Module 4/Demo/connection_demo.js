const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'LizMarie~1903',
  database: 'node_demo'
});

connection.connect((err) => {
  if (err) {
    console.error('Connection failed:', err);
    return;
  }

  console.log('Connected to MySQL!');
});