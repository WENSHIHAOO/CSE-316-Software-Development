import React from 'react';
import Banner from './Banner';
import Row1 from './Row1';
import AskAQuestion from './AskAQuestion';
import Ksearch from './Ksearch';
import AnswerPage from './AnswerPage';
import AnswerText from './AnswerText';
import TagsPage from './TagsPage';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default class FakeStackOverflow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      questions: [],
      tags:[],
      firstTime: true,
      Search: false,
      searchOrTag: '',
      nSearch:'',
      row1: true,
      Ask: false,
      Alert: '',
      AnswersQid: [],
      AnswerSize:1,
      AnswerPage: false,
      AnswerText: false,
      TagsPage: false,
      TagIndex:1,
      TagsQuestion:false,
      display:1,
      LoginPage: false,
      SignupPage: false,
      username:'',
      userid:'',
      reputation: 0,
      p: '',
      ProfilePage: false,
      user_date_time: new Date(),
      profile: '',
      ProfileRow1: false,
      ProfileAnswerPage: false,
      ProfileTagsPage: false,
      QuestionEdit: false,
      AnswerEdit: false,
      TagEdit: false,
      QuestionE: 0,
      AnswerE: 0,
      TagE: 0,
    }
    
    this.handleRow1Change = this.handleRow1Change.bind(this);
    this.handleTagsPage = this.handleTagsPage.bind(this);
    this.handleAnswerText = this.handleAnswerText.bind(this);
    this.handleAnswerQuestion = this.handleAnswerQuestion.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleAskChange = this.handleAskChange.bind(this);
    this.handleQSubmitChange = this.handleQSubmitChange.bind(this);
    this.handleAlertChange = this.handleAlertChange.bind(this);
    this.handlekeywordChange = this.handlekeywordChange.bind(this);
    this.handleDisplayChange = this.handleDisplayChange.bind(this);
    this.handleShowLogin = this.handleShowLogin.bind(this);
    this.handleShowSignup = this.handleShowSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handle5Answers = this.handle5Answers.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleShowProfile = this.handleShowProfile.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.handleQuestionEditPage = this.handleQuestionEditPage.bind(this);
    this.handleAnswerEditPage = this.handleAnswerEditPage.bind(this);
    this.handleTagEditPage = this.handleTagEditPage.bind(this);
    this.handleQuestionEdit = this.handleQuestionEdit.bind(this);
    this.handleAnswerEdit = this.handleAnswerEdit.bind(this);
    this.handleTagEdit = this.handleTagEdit.bind(this);
    this.handleQuestionDelete = this.handleQuestionDelete.bind(this);
    this.handleAnswerDelete = this.handleAnswerDelete.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
  }

  handleQuestionDelete= async(e)=>{
    let Q={
      Qid: this.state.profile.qus[e]._id,
      Uid: this.state.userid,
    }
    await axios.post('http://localhost:8000/QDelete', Q);
    await axios.get('http://localhost:8000/get_profile?id='+this.state.userid).then(res => {this.state.profile = res.data});
    this.handleQuestions();
  }

  handleAnswerDelete= async(e)=>{
    let A={
      Aid: this.state.profile.ans[e]._id,
      Uid: this.state.userid,
    }
    await axios.post('http://localhost:8000/ADelete', A);
    await axios.get('http://localhost:8000/get_profile?id='+this.state.userid).then(res => {this.state.profile = res.data});
    this.handleAnswers();
  }

  handleTagDelete= async(e)=>{
    let T={
      uid: this.state.userid,
      i: e,
      tid: this.state.profile.tag[e]._id,
    }
    await axios.post('http://localhost:8000/TDelete', T);
    await axios.get('http://localhost:8000/get_profile?id='+this.state.userid).then(res => {this.state.profile = res.data});
    this.handleTags();
  }

  handleQuestionEdit= async(e)=>{
    let Q={
      uid: this.state.userid,
      qid: this.state.profile.qus[this.state.QuestionE]._id,
      e: e,
    }
    await axios.post('http://localhost:8000/QEdit', Q);
    await axios.get('http://localhost:8000/get_profile?id='+this.state.userid).then(res => {this.state.profile = res.data});
    this.handleQuestions();
  }

  handleAnswerEdit= async(e)=>{
    let A={
      aid: this.state.profile.ans[this.state.AnswerE]._id,
      e: e,
    }
    await axios.post('http://localhost:8000/AEdit', A);
    await axios.get('http://localhost:8000/get_profile?id='+this.state.userid).then(res => {this.state.profile = res.data});
    this.handleAnswers();
  }

  handleTagEdit= async(e)=>{
    let T={
      uid: this.state.userid,
      i: this.state.TagE,
      tid: this.state.profile.tag[this.state.TagE]._id,
      e: e,
    }
    await axios.post('http://localhost:8000/TEdit', T);
    await axios.get('http://localhost:8000/get_profile?id='+this.state.userid).then(res => {this.state.profile = res.data});
    this.handleTags();
  }

  handleQuestionEditPage(e){
    this.setState({
      QuestionE: e,
      QuestionEdit: true,
      AnswerEdit: false,
      TagEdit: false,
      Search:false,
      row1: false,
      Ask: true,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: false,
      LoginPage: false,
      SignupPage: false,
      ProfilePage: false,
      Alert: '',
    });
  }

  handleAnswerEditPage(e){
    this.setState({
      AnswerE: e,
      QuestionEdit: false,
      AnswerEdit: true,
      TagEdit: false,
      Search:false,
      row1: false,
      Ask: false,
      AnswerPage:false,
      AnswerText: true,
      TagsPage: false,
      TagsQuestion: false,
      LoginPage: false,
      SignupPage: false,
      ProfilePage: false,
      Alert: '',
    });
  }

  handleTagEditPage(e){
    this.setState({
      TagE: e,
      QuestionEdit: false,
      AnswerEdit: false,
      TagEdit: true,
      Alert: '',
    });
  }

  handleQuestions= async()=>{
    await axios.get('http://localhost:8000/get_all_tag').then(res => {this.state.tags = res.data})
    this.setState({
      questions: this.state.profile.qus,
      ProfileRow1: true,
      ProfileAnswerPage: false,
      ProfileTagsPage: false,
      QuestionEdit: false,
      AnswerEdit: false,
      TagEdit: false,
      ProfilePage: true,
      Ask: false,
      Alert: '',
    });
  }

  handleTags= async()=>{
    await axios.get('http://localhost:8000/get_all_question').then(res => {this.state.questions=res.data});
    this.setState({
      tags: this.state.profile.tag,
      ProfileRow1: false,
      ProfileAnswerPage: false,
      ProfileTagsPage: true,
      QuestionEdit: false,
      AnswerEdit: false,
      TagEdit: false,
      Alert: '',
    });
  }

  handleAnswers(){
    this.setState({
      AnswersQid: this.state.profile.ans,
      ProfileRow1: false,
      ProfileAnswerPage: true,
      ProfileTagsPage: false,
      QuestionEdit: false,
      AnswerEdit: false,
      TagEdit: false,
      ProfilePage: true,
      AnswerText: false,
      Alert: '',
    });
  }

  handleShowProfile= async()=>{

    await axios.get('http://localhost:8000/get_profile?id='+this.state.userid).then(res => {this.state.profile = res.data});
    this.setState({
      Search:false,
      row1: false,
      Ask: false,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: false,
      LoginPage: false,
      SignupPage: false,
      ProfilePage: true,
      Alert: '',
      questions: this.state.profile.qus,
      ProfileRow1: true,
      ProfileAnswerPage: false,
      ProfileTagsPage: false,
      QuestionEdit: false,
      AnswerEdit: false,
      TagEdit: false,});
  }

  handleComment(i, e){
    let com = {
      text: e,
      com_by: {name: this.state.username, _id: this.state.userid},
      com_date_time: new Date().toLocaleString(),
    }

    let AnswersQid = this.state.AnswersQid;
    AnswersQid[i].comments.push(com);
    this.setState({AnswersQid: AnswersQid});

    let re={
      id: this.state.AnswersQid[i]._id,
      newC: {
        text: e,
        com_by: this.state.userid,
        com_date_time: com.com_date_time,
      },
    }

    if(i===0){
      axios.post('http://localhost:8000/creat_Q_comment', re);
    }
    else{
      axios.post('http://localhost:8000/creat_A_comment', re);
    }
  }

  handleVote(qid, e){
    let qus = this.state.AnswersQid;
    let re = {
      sameUser: false,
      id: qus[qid]._id,
      addOrMinus: e,
    }
    if(e===0){
      qus[qid].votes--;
      this.setState({
        AnswersQid: qus,
      })
    }
    else{
      qus[qid].votes++;
      this.setState({
        AnswersQid: qus,
      })
    }

    if(qid==="0"){
      if(qus[qid].askedBy._id === this.state.userid){
        re.sameUser = true;
        if(e===0){
          this.setState({
            reputation: this.state.reputation-10,
          })
        }
        else{
          this.setState({
            reputation: this.state.reputation+5,
          })
        }
      }
      axios.post('http://localhost:8000/qVote', re);
    }
    else{
      if(qus[qid].ansBy._id === this.state.userid){
        re.sameUser = true;
        if(e===0){
          this.setState({
            reputation: this.state.reputation-10,
          })
        }
        else{
          this.setState({
            reputation: this.state.reputation+5,
          })
        }
      }
      axios.post('http://localhost:8000/aVote', re);
    }
  }

  handleShowLogin(){
    this.setState({
      Search:false,
      row1: false,
      Ask: false,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: false,
      LoginPage: true,
      SignupPage: false,
      ProfilePage: false,
      Alert: ''});
  }
  handleShowSignup(){
    this.setState({
      Search:false,
      row1: false,
      Ask: false,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: false,
      LoginPage: false,
      SignupPage: true,
      ProfilePage: false,
      Alert: ''});
  }
  handleLogin=async(e)=>{
    let u = e.email+e.password;
    await axios.get('http://localhost:8000/get_user?id='+u).then(res => {
      if(res.data==null){
        this.handleShowLogin();
        this.handleAlertChange('No such user, please register!');
      }
      else if(res.data==="Incorrect password"){
        this.handleShowLogin();
        this.handleAlertChange("Incorrect password");
      }
      else{
        axios.post('http://localhost:8000/login?', res.data);
        this.setState({
          username: res.data.name,
          userid: res.data._id,
          reputation: res.data.reputation,
          user_date_time: res.data.user_date_time
        });
        this.handleRow1Change();
        this.handleDisplayChange(1);
      }
    });
  }

  handleSignup=async(e)=>{
    e.user_date_time = new Date();
    await axios.post('http://localhost:8000/create_user?', e).then(res => {
      if(res.data==="This email is already registered!"){
        this.handleShowSignup();
        this.handleAlertChange("This email is already registered!");
      }
      else{
          this.setState({
            username: e.name,
            user_date_time: e.user_date_time
          });
        }
    });

    if(this.state.username!==''){
      let that = this;
      setTimeout(function(){that.handleLogin(e)},100)
    }
  }

  handleLogout=async()=>{
    await axios.get('http://localhost:8000/logout?').then(res => {
      this.setState({
        username: '',
        userid: '',
      });
      this.handleRow1Change();
    });
  }

  handleTagsPage=async()=>{
    await axios.get('http://localhost:8000/get_all_tag').then(res => {this.state.tags = res.data})
    await axios.get('http://localhost:8000/get_all_question').then(res => {this.state.questions=res.data});
    this.setState({
      Search:false,
      row1: false,
      Ask: false,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: true,
      TagsQuestion: false,
      LoginPage: false,
      SignupPage: false,
      ProfilePage: false,
      Alert: '',
      TagEdit: false,});
  }
  handleAnswerText(){
    this.setState({
      Search:false,
      row1: false,
      Ask: false,
      AnswerPage:false,
      AnswerText: true,
      TagsPage: false,
      TagsQuestion: false,
      LoginPage: false,
      SignupPage: false,
      ProfilePage: false,
      Alert: '',
      AnswerEdit: false,});
  }
  handleAnswerQuestion=async(e, n) =>{
    if(n===0){
      await axios.get('http://localhost:8000/get_ansPage?id='+e).then(res => {this.state.AnswersQid = res.data});
    }
    else {
      await axios.post('http://localhost:8000/create_answer', e);
      await axios.get('http://localhost:8000/get_ansPage?id='+e.qId).then(res => {this.state.AnswersQid = res.data});
    }
    this.setState({
      Search:false,
      row1: false,
      Ask: false,
      AnswerPage:true,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: false,
      LoginPage: false,
      SignupPage: false,
      ProfilePage: false,
      Alert: '',
      AnswerSize:1});
  }

  handle5Answers(e){
    if(e===0){
      this.setState({
        AnswerSize: this.state.AnswerSize+5
      })
    }
    else{
      this.setState({
        AnswerSize: this.state.AnswerSize-5
      })
    }
  }

  handleSearchChange=async(e, n) =>{
    if(n){
      this.state.searchOrTag="Search Results";
      await axios.get('http://localhost:8000/get_search?id='+e).then(res => {this.state.nSearch = res.data});
    }
    else{
      this.state.searchOrTag = "Questions tagged "+e;
      await axios.get('http://localhost:8000/get_sTag?id='+e).then(res => {this.state.nSearch = res.data});
    }
    this.setState({
      Search:true,
      row1: false,
      Ask: false,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: false,
      LoginPage: false,
      SignupPage: false,
      ProfilePage: false,
      Alert: ''});
  }
  handleAskChange(){
    this.setState({
      Search:false,
      row1: false,
      Ask: true,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: false,
      LoginPage: false,
      SignupPage: false,
      ProfilePage: false,
      Alert: '',
      QuestionEdit: false,});
  }
  handleRow1Change = async() =>{
    await axios.get('http://localhost:8000/get_all_tag').then(res => {this.state.tags = res.data})
    await axios.get('http://localhost:8000/get_all_question').then(res => {this.state.questions=res.data});
    this.setState({
      Search:false,
      row1: true,
      Ask: false,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: false,
      LoginPage: false,
      SignupPage: false,
      ProfilePage: false,
      Alert: ''});
  }
  handleQSubmitChange= async(e)=>{
    e.asked_by = this.state.userid;
    e.ask_date_time=new Date();
    let uq = {
      user: this.state.userid,
      q: e,
    }
    await axios.post('http://localhost:8000/create_question', uq);
    this.handleRow1Change();
  }
  handlekeywordChange(e){
    let Akeyword = e.split(" ");
    return repeat(Akeyword);
  }
  handleAlertChange(e){
    this.setState({Alert: e});
  }
  handleDisplayChange(e){
    this.setState({display: e});
  }

  componentDidMount() {
    axios.get('http://localhost:8000/session').then(res => {if(res.data!=null){this.setState({username:res.data.name, userid:res.data._id, reputation: res.data.reputation, user_date_time: res.data.user_date_time})}});
    axios.get('http://localhost:8000/get_all_tag').then(res => {this.setState({tags: res.data})});
    axios.get('http://localhost:8000/get_all_question').then(res => {this.setState({questions: res.data})});
  }

  render(){
    return (
      <div>
        {<Banner  
        handleDisplayChange={this.handleDisplayChange}
        handleTagsPage={this.handleTagsPage}
        handleRow1Change={this.handleRow1Change}
        handleSearchChange={this.handleSearchChange}
        handleShowLogin = {this.handleShowLogin}
        handleShowSignup = {this.handleShowSignup}
        handleLogout = {this.handleLogout}
        handleShowProfile = {this.handleShowProfile}
        state = {this.state}/>}

        <p className="Alert">{this.state.Alert}</p>

        {this.state.row1 ? <Row1 
        handleDisplayChange={this.handleDisplayChange}
        handleAnswerQuestion={this.handleAnswerQuestion}
        handleAskChange={this.handleAskChange}
        handleAlertChange = {this.handleAlertChange}
        state = {this.state}/> : ''}
 
        {this.state.Ask ? <AskAQuestion 
        handleDisplayChange={this.handleDisplayChange}
        handleQSubmitChange = {this.handleQSubmitChange}
        handleAlertChange = {this.handleAlertChange}
        handlekeywordChange = {this.handlekeywordChange}
        handleQuestionEdit = {this.handleQuestionEdit}
        state = {this.state}/> 
        : ''}

        {this.state.Search ? <Ksearch 
        handleAnswerQuestion={this.handleAnswerQuestion}
        handleAskChange={this.handleAskChange}
        handleAlertChange = {this.handleAlertChange}
        state = {this.state}/>
        :''}

        {this.state.AnswerPage ? <AnswerPage  
        handleAnswerText={this.handleAnswerText}
        handleAskChange={this.handleAskChange}
        handle5Answers={this.handle5Answers}
        handleVote={this.handleVote}
        handleAlertChange = {this.handleAlertChange}
        handleComment = {this.handleComment}
        state = {this.state}/>
        :''}

        {this.state.AnswerText ? <AnswerText 
        handleAnswerQuestion = {this.handleAnswerQuestion}
        handleAlertChange = {this.handleAlertChange}
        handleAnswerEdit = {this.handleAnswerEdit}
        state = {this.state}/>
        :''}

        {this.state.TagsPage ? <TagsPage 
        handleDisplayChange={this.handleDisplayChange}
        handleAskChange={this.handleAskChange}
        handleSearchChange={this.handleSearchChange}
        handleAlertChange = {this.handleAlertChange}
        state = {this.state}/>
        :''}

        {this.state.LoginPage ? <Login 
        handleLogin = {this.handleLogin}
        handleAlertChange = {this.handleAlertChange}
        state = {this.state}/>
        :''}

        {this.state.SignupPage ? <Signup 
        handleSignup = {this.handleSignup}
        handleAlertChange = {this.handleAlertChange}
        state = {this.state}/>
        :''}

        {this.state.ProfilePage ? <Profile
        handleQuestions = {this.handleQuestions}
        handleTags = {this.handleTags}
        handleAnswers = {this.handleAnswers}
        handleQuestionEditPage = {this.handleQuestionEditPage}
        handleAnswerEditPage = {this.handleAnswerEditPage}
        handleTagEditPage = {this.handleTagEditPage}
        handleQuestionDelete = {this.handleQuestionDelete}
        handleAnswerDelete = {this.handleAnswerDelete}
        handleTagDelete = {this.handleTagDelete}
        handleTagEdit = {this.handleTagEdit}
        //Row 1
        handleDisplayChange={this.handleDisplayChange}
        handleAnswerQuestion={this.handleAnswerQuestion}
        handleAskChange={this.handleAskChange}
        handleAlertChange = {this.handleAlertChange}
        //AnswerPage
        handleAnswerText={this.handleAnswerText}
        //handleAskChange={this.handleAskChange}
        handle5Answers={this.handle5Answers}
        handleVote={this.handleVote}
        //handleAlertChange = {this.handleAlertChange}
        handleComment = {this.handleComment}
        //TagsPage
        //handleDisplayChange={this.handleDisplayChange}
        //handleAskChange={this.handleAskChange}
        handleSearchChange={this.handleSearchChange}
        //handleAlertChange = {this.handleAlertChange}
        state = {this.state}/>
        :''}
        </div>
    )
  }
}

function repeat(t){
  let aKey=[];
  for(let i=0; i<t.length; i++){
    if(t[i] === ""){
      continue;
    }
    if(aKey.indexOf(t[i]) === -1){
      aKey.push(t[i]);
    }
  }
  return aKey;
}