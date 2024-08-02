// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

const express = require('express');
const app = express();
var cors = require('cors')
const port = 8000;

let question = require('./pages/question');
let answer = require('./pages/answer');
let tag = require('./pages/tag');
let search = require('./pages/search');
let ansPage = require('./pages/ansPage');
let mongoose = require('mongoose');
let mongoDB = "mongodb://127.0.0.1:27017/fake_so";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//___get___//
app.get('/get_all_question', (req, res) => {
  question.get_all_question().then((re) => res.send(re));
})
app.get('/get_all_tag', (req, res) => {
  tag.get_all_tag().then((re) => res.send(re));
})
app.get('/get_search', (req, res) => {
  search.get_search(req.query.id).then((re) => res.send(re));
})
app.get('/get_ansPage', (req, res) => {
  ansPage.get_ansPage(req.query.id).then((re) => res.send(re));
})

//___post___//
app.post('/create_question', (req, res) => {
  let newQ = req.body;
  question.create_question(newQ).then((re) => res.send(re));
})
app.post('/create_answer', (req, res) => {
  let qId = req.body.qId
  let ans = req.body.ans;
  answer.create_answer(qId, ans).then((re) => res.send(re));
})

let server = app.listen(port, () => {
  console.log('App listening on port '+port);
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('\nServer closed')
  })
  if(db) {
    db.close()
      .then(() => console.log('Database instance disconnected'))
      .catch((err) => console.log(err));
  }
})
