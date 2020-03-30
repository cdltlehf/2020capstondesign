const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8080;

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'passwd',
  database: 'mydb'
});
connection.connect();

function insert_sensor(device, unit, type, value, seq, ip) {
  let obj = { device, unit, type, value, seq, ip };
  let query = connection.query('insert into sensors set ?', obj, (err, rows, cols) => {
    if (err) throw err;
    console.log("database insertion ok =%j", obj);
  });
}

app.get('/', (req, res) => { res.end('Nice to meet you'); });
app.get('/log', (req, res) => {
  r = req.query;
  console.log("GET %j", r);

  insert_sensor(r.device, r.unit, r.type, r.value, r.seq, req.connection.remoteAddress);
  res.send('OK' + JSON.stringify(req.query));
});
app.get("/data", (req, res) => {
  console.log("param=" + req.query);
  const qstr = 'select * from sensors ';
  connection.query(qstr, (err, rows, cols) => {
    if (err) {
      throw err;
      res.send('query error: ' + qstr);
      return;
    }
    
    console.log("Got " + rows.length + " records");
    let html = "";
    for (var i = 0; i < rows.length; i++) {
      html += JSON.stringify(rows[i]);
    }
    res.send(html);
  });
});

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});
