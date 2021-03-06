const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partails');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('toUpperCase', (text) => {
	return text.toUpperCase();
});

app.use((req, res, next) => {
	let date = new Date().toString();
	let log = `${date} ${req.method} ${req.url}\n`;

	console.log(log);
	fs.appendFile('server.log', log, (err) => {
		if(err)
			console.error(err);
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// 	//next();
// });

app.get('/', (req, res) => {
	res.render('home.hbs', {
		title: 'Home',
		welcomeMessage: 'Welcome To Our Page!!'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		title: 'About'
	});
});

app.get('/aboutus', (req, res) => {
	res.render('about.hbs', {
		title: 'About'
	});
});

app.get('/ourteam', (req, res) => {
	res.render('about.hbs', {
		title: 'About'
	});
});

app.get('/bad', (req, res) => {
	res.send('<h1>Bad Request</h1>');
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		title: "Projects"
	});
});

app.listen(port, '0.0.0.0', () => {
	console.log(`listening to port ${port}`);
});