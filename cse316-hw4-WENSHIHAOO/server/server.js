// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

const express = require('express');
const app = express();
var cors = require('cors')
const port = 8000;
var mysql = require('mysql');

let answer = require('./db/Answer');
let question = require('./db/Question');
let tag = require('./db/Tag');
let search = require('./db/Search');

let userArgs = process.argv.slice(2);

if(userArgs.length == 0) {
  console.log('missing arguments');
  console.log('Correct Usage: node verify_schema -u <mysqlusername> -p <mysqlpassword>');
}

if(userArgs.length != 4) {
  console.log('Bad arguments');
  console.log('Correct Usage: node verify_schema -u <mysqlusername> -p <mysqlpassword>');
}

if(userArgs[0] != '-u') {
  console.log('username missing');
}

if(userArgs[2] != '-p') {
  console.log('password missing');
}

user = userArgs[1];
pass = userArgs[3];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//___get___//
app.get('/get_all_question', (req, res) => {
  let connection = mysql.createConnection({
    host     : 'localhost',
    user     : user,
    password : pass,
    database : 'fake_so'
  });
  question.get_all_question(connection).then((re) => res.send(re));
})
app.get('/get_all_tag', (req, res) => {
  let connection = mysql.createConnection({
    host     : 'localhost',
    user     : user,
    password : pass,
    database : 'fake_so'
  });
  tag.get_all_tag(connection).then((re) => res.send(re));
})
app.get('/get_search', (req, res) => {
  let connection1 = mysql.createConnection({
    host     : 'localhost',
    user     : user,
    password : pass,
    database : 'fake_so'
  });
  let connection2 = mysql.createConnection({
    host     : 'localhost',
    user     : user,
    password : pass,
    database : 'fake_so'
  });
  search.get_search(connection1, connection2, req.query.id).then((re) => res.send(re));
})
app.get('/get_sTag', (req, res) => {
  let connection1 = mysql.createConnection({
    host     : 'localhost',
    user     : user,
    password : pass,
    database : 'fake_so'
  });
  let connection2 = mysql.createConnection({
    host     : 'localhost',
    user     : user,
    password : pass,
    database : 'fake_so'
  });
  search.get_sTag(connection1, connection2, req.query.id).then((re) => res.send(re));
})
app.get('/get_ansPage', (req, res) => {
  let connection = mysql.createConnection({
    host     : 'localhost',
    user     : user,
    password : pass,
    database : 'fake_so'
  });
  answer.get_ansPage(connection, req.query.id).then((re) => res.send(re));
})

//___post___//
app.post('/create_question', (req, res) => {
  let newQ = req.body;
  let connection = mysql.createConnection({
    host     : 'localhost',
    user     : user,
    password : pass,
    database : 'fake_so'
  });
  question.create_question(connection,newQ).then((re) => res.send(re));
})
app.post('/create_answer', (req, res) => {
  let qId = req.body.qId
  let ans = req.body.ans;
  let connection = mysql.createConnection({
    host     : 'localhost',
    user     : user,
    password : pass,
    database : 'fake_so'
  });
  answer.create_answer(connection, qId, ans).then((re) => res.send(re));
})

let server = app.listen(port, () => {
  console.log('App listening on port '+port);
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('\nServer closed. Database instance disconnected');
  });
})
