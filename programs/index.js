const express = require('express');
const proxy = require('express-http-proxy');
const mysql = require('mysql');

const app = express();


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database'
});
connection.connect();


app.use('/api', proxy('http://localhost:3001'));


app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
