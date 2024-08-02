// Application server
const express = require('express');
const app = express();
let cors = require('cors')
const port = 8000;

let question = require('./pages/question');
let answer = require('./pages/answer');
let tag = require('./pages/tag');
let search = require('./pages/search');
let ansPage = require('./pages/ansPage');
let user = require('./pages/user');
let profile = require('./pages/profile');
let mongoose = require('mongoose');
let mongoDB = "mongodb://127.0.0.1:27017/fake_so";
const session = require("express-session");
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(
  session({
    secret: "secret to sign session cookie",
    cookie: {},
    resave: false,
    saveUninitialized: false,
  })
)

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//delete//
app.post("/QDelete", (req, res) => {
  let Qid = req.body.Qid;
  let Uid = req.body.Uid;
  question.QDelete(Qid, Uid).then((re) => res.send(re));
})
app.post("/ADelete", (req, res) => {
  let Aid = req.body.Aid;
  let Uid = req.body.Uid;
  answer.ADelete(Aid, Uid).then((re) => res.send(re));
})
app.post("/TDelete", (req, res) => {
  let uid = req.body.uid;
  let i = req.body.i;
  let tid = req.body.tid;
  tag.TDelete(tid, i, uid).then((re) => res.send(re));
})

//edit//
app.post("/QEdit", (req, res) => {
  let qid = req.body.qid
  let e = req.body.e;
  let uid = req.body.uid;
  question.QEdit(qid, e, uid).then((re) => res.send(re));
})
app.post("/AEdit", (req, res) => {
  let aid = req.body.aid
  let e = req.body.e;
  answer.AEdit(aid, e).then((re) => res.send(re));
})
app.post("/TEdit", (req, res) => {
  let uid = req.body.uid;
  let i = req.body.i;
  let tid = req.body.tid;
  let e = req.body.e;
  tag.TEdit(tid, e, i, uid).then((re) => res.send(re));
})

//___user___//
app.post("/login", (req, res) => {
  let log={
    _id: req.body._id,
    name: req.body.name,
    reputation: req.body.reputation,
    user_date_time: req.body.user_date_time
  }
  req.session.user = log;
  res.send();
})
app.get("/session", (req, res) => {
  if(req.session.user){
    res.send(req.session.user);
  }
  else{
    res.send("null");
  }
})
app.get("/logout", (req, res) => {
  req.session.destroy(err => {res.send()})
})
app.get('/get_user', (req, res) => {
  let len = req.query.id.indexOf('.com')+4;
  let email = req.query.id.substring(0, len);
  let password = req.query.id.substring(len);
  user.get_user(email, password).then((re) => res.send(re));
})
app.post('/create_user', (req, res) => {
  let newU = req.body;
  user.create_user(newU).then((re) => res.send(re));
})

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
app.get('/get_sTag', (req, res) => {
  search.get_sTag(req.query.id).then((re) => res.send(re));
})
app.get('/get_ansPage', (req, res) => {
  ansPage.get_ansPage(req.query.id).then((re) => res.send(re));
})
app.get('/get_profile', (req, res) => {
  profile.get_profile(req.query.id).then((re) => res.send(re));
})

//___post___//
app.post('/create_question', (req, res) => {
  let newQ = req.body.q;
  let user = req.body.user;
  question.create_question(newQ, user).then((re) => res.send(re));
})
app.post('/create_answer', (req, res) => {
  let qId = req.body.qId
  let ans = req.body.ans;
  answer.create_answer(qId, ans).then((re) => res.send(re));
})
app.post('/qVote', (req, res) => {
  if(req.body.sameUser){
    if(req.body.addOrMinus==0){
      req.session.user.reputation = req.session.user.reputation-10;
    }
    else{
      req.session.user.reputation = req.session.user.reputation+5;
    }
  }
  let qid = req.body.id;
  let addOrMinus = req.body.addOrMinus;
  ansPage.qVote(qid, addOrMinus).then((re) => res.send(re));
})
app.post('/aVote', (req, res) => {
  if(req.body.sameUser){
    if(req.body.addOrMinus==0){
      req.session.user.reputation = req.session.user.reputation-10;
    }
    else{
      req.session.user.reputation = req.session.user.reputation+5;
    }
  }
  let aid = req.body.id;
  let addOrMinus = req.body.addOrMinus;
  ansPage.aVote(aid, addOrMinus).then((re) => res.send(re));
})
app.post('/creat_Q_comment', (req, res) => {
  let qid = req.body.id;
  let newC = req.body.newC;
  ansPage.creat_Q_comment(qid, newC).then((re) => res.send(re));
})
app.post('/creat_A_comment', (req, res) => {
  let aid = req.body.id;
  let newC = req.body.newC;
  ansPage.creat_A_comment(aid, newC).then((re) => res.send(re));
})

/////////////
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
