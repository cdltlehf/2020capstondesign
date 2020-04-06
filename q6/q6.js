const express = require('express');
const mysql = require('mysql');
const moment = require('moment');

const app = express();
const port = 8081;

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'passwd',
  database: 'mydb'
});
connection.connect();

function insert_sensor( { device, unit, type, value, seq, ip="127.0.0.1" }, callback ) {
  ip = ip.replace(/^.*:/, '');
  let obj = { device, unit, type, value, seq, ip };
  let query = connection.query('insert into sensors set ?', obj, (err, results, field) => {
    if (err) {
      throw err;
      res.send('query err: ' + qstr);
      return;
    }
    if (callback) callback(results);
  });
}

function select_sensor(device, callback) {
  let qstr = 'select * from sensors where time > DATE_SUB(NOW(), INTERVAL 24 HOUR)';
  if (device) qstr += ` and device= ${ device }`;
  connection.query(qstr, (err, results, field) => {
    if (err) {
      throw err;
      res.send('query err: ' + qstr);
      return;
    }
    if (callback) callback(results, field);
  });
}

app.get('/', (req, res) => { res.end('This is q6 main page.'); });

app.get('/input', (req, res) => { 
  insert_sensor( req.query, (result) => {
    let obj = { "device_id": req.query.device, "value": req.query.value,  "status":"ok", "time": moment().format('YYYY-M-D hh:mm:ss') };
    res.send(JSON.stringify(obj));
  });
});

app.get('/data', (req, res) => {
  select_sensor( req.query.device, (results, field) => {
    obj = results.map((result) => {
      return { "device_id": result.device, "value": result.value, "status": "ok", "time": moment(result.time).format('YYYY-M-D hh:mm:ss') };
    });
    res.send(JSON.stringify(obj));
  });
});

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
