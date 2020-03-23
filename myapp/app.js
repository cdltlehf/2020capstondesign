const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
	const ip = (req.headers['x-forwarded-for'] ||  req.connection.remoteAddress).replace(/(.*:){3}/,"");
	const today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth();
	let date = today.getDate();
	let hour = today.getHours();
	let minute = today.getMinutes();
	let second = today.getSeconds();
	
	month += 1;
	month = month < 10 ? '0' + month : month;
	date = date < 10 ? '0' + date : date;
	hour = hour % 12;
	hour = hour < 10 ? '0' + hour : hour;
	minute = minute < 10 ? '0' + minute : minute;
	second = second < 10 ? '0' + second : second;
	res.send(JSON.stringify(
		{
			...req.query,
			"ip": ip,
			"time": `${year}-${month}-${date} ${hour}:${minute}:${second}`,
			"email": "cdltlehf@naver.com",
			"stuno": "20171650",
		}));
});

app.use(express.urlencoded());
app.use(express.json());
app.post('/', (req, res) => {
	const ip = (req.headers['x-forwarded-for'] ||  req.connection.remoteAddress).replace(/(.*:){3}/,"");
	const today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth();
	let date = today.getDate();
	let hour = today.getHours();
	let minute = today.getMinutes();
	let second = today.getSeconds();
	
	month += 1;
	month = month < 10 ? '0' + month : month;
	date = date < 10 ? '0' + date : date;
	hour = hour % 12;
	hour = hour < 10 ? '0' + hour : hour;
	minute = minute < 10 ? '0' + minute : minute;
	second = second < 10 ? '0' + second : second;
	res.send(JSON.stringify(
		{
			...req.body,
			"ip": ip,
			"time": `${year}-${month}-${date} ${hour}:${minute}:${second}`,
			"email": "cdltlehf@naver.com",
			"stuno": "20171650",
		}
	));
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
