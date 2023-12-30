const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : '',
		password : '',
		database: 'facetrain'
	}
})

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {res.send(database.users) })

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
	
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req.body.input, req, res) })

app.listen(3000, ()=> {
	console.log('App works on port 3000');
});


// bcrypt.hash(password, null, null, function(err, hash) {
// 		console.log(hash);
// 	});

// load hash from password database



// route route that responds with this is working
// signin: probably post and respond with either success/fail
// register: post and returns new user object
// home screen ability to access profile with userId will be get request return user
// image endpoint using put return updated user object