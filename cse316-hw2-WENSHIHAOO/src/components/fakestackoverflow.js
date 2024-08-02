import React from 'react';
import Model from '../models/model.js';

export default class FakeStackOverflow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      model: new Model(),
      firstTime: true,
      Search: false,
      searchText: '',
      row1: true,
      Ask: false,
      Alert: '',
      AnswersQid: 0,
      AnswerPage: false,
      AnswerText: false,
      TagsPage: false,
      TagIndex:1,
      TagsQuestion:false,
      display:1,
    }
    this.handleRow1Change = this.handleRow1Change.bind(this);
    this.handleTagsQuestion = this.handleTagsQuestion.bind(this);
    this.handleTagId = this.handleTagId.bind(this);
    this.handleTagsPage = this.handleTagsPage.bind(this);
    this.handleAnswerText = this.handleAnswerText.bind(this);
    this.handleAnswerQuestion = this.handleAnswerQuestion.bind(this);
    this.handleAnswersQidChange = this.handleAnswersQidChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleAskChange = this.handleAskChange.bind(this);
    this.handleQSubmitChange = this.handleQSubmitChange.bind(this);
    this.handleAlertChange = this.handleAlertChange.bind(this);
    this.handlekeywordChange = this.handlekeywordChange.bind(this);
    this.handleDisplayChange = this.handleDisplayChange.bind(this);
  }

  handleTagsQuestion(){
    this.setState({
      Search:false,
      row1: false,
      Ask: false,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: true});
  }
  handleTagId(e){
    this.setState({TagIndex: e});
  }
  handleTagsPage(){
    this.setState({
      Search:false,
      row1: false,
      Ask: false,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: true,
      TagsQuestion: false});
  }
  handleAnswerText(){
    this.setState({
      Search:false,
      row1: false,
      Ask: false,
      AnswerPage:false,
      AnswerText: true,
      TagsPage: false,
      TagsQuestion: false});
  }
  handleAnswerQuestion(){
    this.setState({
      Search:false,
      row1: false,
      Ask: false,
      AnswerPage:true,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: false});
  }
  handleAnswersQidChange(e){
    this.setState({AnswersQid: e});
  }
  handleSearchChange(){
    this.setState({
      Search:true,
      row1: false,
      Ask: false,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: false});
  }
  handleSearchTextChange(e){
    this.setState({searchText: e});
  }
  handleAskChange(){
    this.setState({
      Search:false,
      row1: false,
      Ask: true,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: false});
  }
  handleRow1Change(){
    this.setState({
      Search:false,
      row1: true,
      Ask: false,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: false,});
  }
  handleQSubmitChange(e){
    let date=new Date();
    e.tagIds = this.handlekeywordChange(e.tagIds);
    e.qid= 'q'+ (this.state.model.data.questions.length+1);
    e.askedOn= this.state.month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
    e.askedAt= date.getHours()+":"+date.getMinutes();
    this.state.model.newQuestion(e);
  }
  handlekeywordChange(e){
    let Akeyword = e.split(" ");
    let akey = repeat(Akeyword);
    return tagToTagId(akey, this.state.model);
  }
  handleAlertChange(e){
    this.setState({Alert: e});
  }
  handleDisplayChange(e){
    this.setState({display: e});
  }

  render() {
    return (
      <div>
        {<Banner  
        handleDisplayChange={this.handleDisplayChange}
        handleTagsPage={this.handleTagsPage}
        handleRow1Change={this.handleRow1Change}
        handleSearchTextChange={this.handleSearchTextChange}
        handleSearchChange={this.handleSearchChange}
        state = {this.state}/>}

        {this.state.row1 ? <Row1 
        handleDisplayChange={this.handleDisplayChange}
        handleAnswerQuestion={this.handleAnswerQuestion}
        handleAskChange={this.handleAskChange}
        handleAnswersQidChange={this.handleAnswersQidChange}
        state = {this.state}/> : ''}

        <p className="Alert">{this.state.Alert}</p>

        {this.state.Ask ? <AskAQuestion 
        handleDisplayChange={this.handleDisplayChange}
        handleRow1Change={this.handleRow1Change}
        handleQSubmitChange = {this.handleQSubmitChange}
        handleAlertChange = {this.handleAlertChange}
        state = {this.state}/> 
        : ''}

        {this.state.Search ? <Ksearch 
        handleAnswerQuestion={this.handleAnswerQuestion}
        handleAskChange={this.handleAskChange}
        handleAnswersQidChange={this.handleAnswersQidChange}
        state = {this.state}/>
        :''}

        {this.state.AnswerPage ? <AnswerPage  
        handleAnswerText={this.handleAnswerText}
        handleAskChange={this.handleAskChange}
        state = {this.state}/>
        :''}

        {this.state.AnswerText ? <AnswerText 
        handleAnswerQuestion = {this.handleAnswerQuestion}
        handleAlertChange = {this.handleAlertChange}
        state = {this.state}/>
        :''}

        {this.state.TagsPage ? <TagsPage 
        handleDisplayChange={this.handleDisplayChange}
        handleAskChange={this.handleAskChange}
        handleTagsQuestion={this.handleTagsQuestion}
        handleTagId = {this.handleTagId}
        state = {this.state}/>
        :''}

        {this.state.TagsQuestion ? <TagsQuestion  
        handleAnswerQuestion={this.handleAnswerQuestion}
        handleAskChange={this.handleAskChange}
        handleAnswersQidChange={this.handleAnswersQidChange}
        state = {this.state}/>
        :''}
        </div>
    )
  }
}

//____________________Banner______________________//
class Banner extends React.Component{
  constructor(props){
    super(props);
    this.state={
      search:'',
    }
    this.SearchChange = this.SearchChange.bind(this);
    this.QuestionChange = this.QuestionChange.bind(this);
    this.TagsChange = this.TagsChange.bind(this);
    this.SearchKeyDown = this.SearchKeyDown.bind(this);
  }
  SearchChange(e){
    this.setState({search: e.target.value});
  }
  SearchKeyDown(e){
    if(e.keyCode === 13){
      this.props.handleDisplayChange(0);
      this.props.handleSearchTextChange(this.state.search);
      this.props.handleSearchChange();
    }
  }
  QuestionChange(){
    this.props.handleDisplayChange(1);
    this.props.handleRow1Change();
  }
  TagsChange(){
    this.props.handleDisplayChange(2);
    this.props.handleTagsPage();
  }

  render(){
    return(
    <div id="banner" className="banner" >
      <a id="Question" onClick={this.QuestionChange} style={{backgroundColor: this.props.state.display==1 ? '#0281E8' : ''}}>Questions</a>
      <a id="Tags" onClick={this.TagsChange} style={{backgroundColor: this.props.state.display==2 ? '#0281E8' : ''}}>Tags</a>
      <h1>Fake Stack Overflow</h1>
      <input type="text" placeholder="Search..." id="search"
              onKeyDown={this.SearchKeyDown} onChange ={this.SearchChange}/>
    </div>
    );
  }
}
//____________________All Questions Page______________________//
class Row1 extends React.Component{
  constructor(props){
    super(props);
    this.AskChange = this.AskChange.bind(this);
    this.AnswersQidChange = this.AnswersQidChange.bind(this);
  }
  AskChange(){
    this.props.handleDisplayChange(0);
    this.props.handleAskChange();
  }

  AnswersQidChange(e){
    let a =e.target+"";
    let index = 0;
    let q="q"+a.substring(a.indexOf("#q")+2);
    for(let i=0; i<this.props.state.model.data.questions.length; i++){
      if(this.props.state.model.data.questions[i].qid == q){
        index = i;
        this.props.handleDisplayChange(0);
        this.props.handleAnswersQidChange(index);
        this.props.handleAnswerQuestion();
        break;
      }
    }
  }

  N_Question(data){
    const N = [];
    let tTT=0;
    for(let i=data.questions.length-1; i>=0; i--){
      tTT=0;
      N.push(
        <table key={data.questions[i].qid}>
          <tbody>
            <tr>
              <td className="column1">{data.questions[i].views} Views</td>
              <td className="column2"><a href={"#" + data.questions[i].qid} onClick={this.AnswersQidChange}>{data.questions[i].title}</a></td>
              <td className="column3"> Asked By <span className='askedBy'>{data.questions[i].askedBy}</span></td>
            </tr>
            <tr>
              <td className="column1" rowSpan="2">{data.questions[i].answers.length} Answers</td>
              <td className="column2" rowSpan="2">{tagIdToTag(data, i, tTT)}</td>
              <td className="column3"> On <span className='askedOn'>{data.questions[i].askedOn}</span></td>
            </tr>
            <tr>
              <td className="column3"> At <span className='askedAt'>{data.questions[i].askedAt}</span></td>
            </tr>
          </tbody>
        </table>);
        N.push(<hr key={i}></hr>);
    }
    return N;
  }
    render(){
      if(this.props.state.firstTime){
        this.props.state.firstTime = false;
        let questions = this.props.state.model.data.questions;
        let answers = this.props.state.model.data.answers;

        questions.sort(function(a, b){ 
          if(Date.parse(a.askedOn+' '+ a.askedAt)>Date.parse(b.askedOn+' '+ b.askedAt)){return 1} else{return -1}
        });

        for(let index=0; index<questions.length; index++){
          questions[index].answers.sort(function(a, b){ 
            if(Date.parse(answers[a.charAt(1)-1].ansOn+' '+ answers[a.charAt(1)-1].ansAt)>Date.parse(answers[b.charAt(1)-1].ansOn+' '+ answers[b.charAt(1)-1].ansAt)){return 1} else{return -1}
          });
        }
      }

    return(
    <div id="main" className="main">
      <table>
        <thead>
          <tr id = "row1"> 
            <th id="N" className="column1">{this.props.state.model.data.questions.length} Questions</th>
            <th id="All" className="column2">All Questions</th>
            <th id = "Ask" className="column3"><button type="button" className = "AskA"
              onClick={this.AskChange}>Ask A Question</button></th>
          </tr>
        </thead>
      </table>
      <div id="N_Question">{this.N_Question(this.props.state.model.data)}</div>
    </div>
    )
  }
}

function tagIdToTag(data, x, tTT){
  const N=[];
  for(let j=0; j<data.questions[x].tagIds.length; j++){
    for(let i=0; i<data.tags.length; i++){
      if(data.tags[i].tid == data.questions[x].tagIds[j]){
        tTT++;
        if(tTT%4==0){
          N.push(<span className="name" key={data.tags[i].name}>{data.tags[i].name}</span>);
          N.push(<br></br>);
        }
        N.push(<span className="name" key={data.tags[i].name}>{data.tags[i].name}</span>);
      }
    }
  }
  return N;
} 

//____________________New Question Page______________________//
class AskAQuestion extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      qid: 'q'+ this.props.state.model.data.questions.length,
      title: "",
      text: "",
      tagIds: "",
      askedBy : "",
      askedOn: "",
      askedAt: "",
      answers:[],
      views: 0,
    }
    this.titleChange = this.titleChange.bind(this);
    this.detailChange = this.detailChange.bind(this);
    this.keywordChange = this.keywordChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.handleQSubmit = this.handleQSubmit.bind(this);
  }
  titleChange(e){
    this.setState({title: e.target.value});
  }
  detailChange(e){
    this.setState({text: e.target.value});
  }
  keywordChange(e){
    this.setState({tagIds: e.target.value});
  }
  usernameChange(e){
    this.setState({askedBy: e.target.value});
  }

  handleQSubmit(){
    if (this.state.title.trim() == "") { 
      this.props.handleAlertChange("Titile should not be empty.");
     }
    else if (this.state.title.length > 100) {
      this.props.handleAlertChange("Titile should not be more than 100 characters.");
    }
    else if (this.state.text.trim() == "") {  
      this.props.handleAlertChange("Detail should not be empty.");
    }
    else if (this.state.tagIds.trim() == "") {  
      this.props.handleAlertChange("Keyword should not be empty.");
    }
    else if (this.state.askedBy.trim() == "") {  
      this.props.handleAlertChange("Username should not be empty.");
    }
    else if (this.state.askedBy.length > 15) {
      this.props.handleAlertChange("Username should not be more than 15 characters.");
    }
    else{
      this.props.handleDisplayChange(1);
      this.props.handleQSubmitChange(this.state);
      this.props.handleRow1Change();
      this.props.handleAlertChange('');
      this.setState({ 
      qid: 'q'+ this.props.state.model.data.questions.length,
      title: "",
      text: "",
      tagIds: "",
      askedBy : "",
      askedOn: "",
      askedAt: "",
      answers:[],
      views: 0,});
    }
  }
  render(){
    return  <div id="AskAQuestion">
    <h2>Question Title</h2>
    <p>Title should not be more than 100 characters.</p>
    <textarea type="text" id="title" value={this.state.title} onChange={this.titleChange}></textarea><br></br>
    <h2>Question Text</h2>
    <p>Add details.</p>
    <textarea type="text" id="detail" value={this.state.text} onChange={this.detailChange}></textarea><br></br>

    <h2>Tags</h2>
    <p>Add Keywords separated by whitespace.</p>
    <textarea type="text" id="keyword" value={this.state.tagIds} onChange={this.keywordChange}></textarea><br></br>

    <h2>Username</h2>
    <p>Should not be more than 15 characters.</p>
    <textarea type="text" id="username" value={this.state.askedBy} onChange={this.usernameChange}></textarea><br></br>

    <button type="button" id="submit" onClick={this.handleQSubmit}>
      Post Question</button>
  </div>
  }
}

function repeat(t){
  let aKey=[];
  for(let i=0; i<t.length; i++){
    if(t[i] == ""){
      continue;
    }
    if(aKey.indexOf(t[i]) == -1){
      aKey.push(t[i]);
    }
  }
  return aKey;
}

function tagToTagId(akey, model){
  let Akey = [];
  let tag = false;
  for(let j=0; j<akey.length; j++){
    tag = false;
    for(let i=0; i<model.data.tags.length; i++){
      if(model.data.tags[i].name==akey[j]){
        Akey.push(model.data.tags[i].tid);
        tag = true;
        break;
      }
    }
    
    if(tag){
      continue;
    }

    const dataTag = {
      tid: 't'+(model.data.tags.length+1),
      name: akey[j],
    }
    model.newTag(dataTag);
    Akey.push( 't'+(model.data.tags.length));
  }
  return Akey;
}

//____________________Searching______________________//
class Ksearch extends React.Component{
  constructor(props){
    super(props);
    this.AskChange = this.AskChange.bind(this);
    this.AnswersQidChange = this.AnswersQidChange.bind(this);
  }
  AskChange(){
    this.props.handleAskChange();
  }
  AnswersQidChange(e){
    let a =e.target+"";
    let index = 0;
    let q="q"+a.substring(a.indexOf("#q")+2);
    for(let i=0; i<this.props.state.model.data.questions.length; i++){
      if(this.props.state.model.data.questions[i].qid == q){
        index = i;
        this.props.handleAnswersQidChange(index);
        this.props.handleAnswerQuestion();
        break;
      }
    }
  }
 
  render(){
    let nSearch = onkey(this.props.state.searchText, this.props.state.model.data.answers, 
                        this.props.state.model.data.tags, this.props.state.model.data.questions);
    let number =0;
    const N = [];
    let tTT=0;
    for(let i=nSearch.length-1; i>=0; i--){
      if(nSearch[i] != 0){
        number++;
        tTT=0;
        N.push(
          <table key={this.props.state.model.data.questions[i].qid}>
            <tbody>
              <tr>
                <td className="column1">{this.props.state.model.data.questions[i].views} Views</td>
                <td className="column2"><a href={"#" + this.props.state.model.data.questions[i].qid} onClick={this.AnswersQidChange}>{this.props.state.model.data.questions[i].title}</a></td>
                <td className="column3"> Asked By <span className='askedBy'>{this.props.state.model.data.questions[i].askedBy}</span></td>
              </tr>
              <tr>
                <td className="column1" rowSpan="2">{this.props.state.model.data.questions[i].answers.length} Answers</td>
                <td className="column2" rowSpan="2">{tagIdToTag(this.props.state.model.data, i, tTT)}</td>
                <td className="column3"> On <span className='askedOn'>{this.props.state.model.data.questions[i].askedOn}</span></td>
              </tr>
              <tr>
                <td className="column3"> At <span className='askedAt'>{this.props.state.model.data.questions[i].askedAt}</span></td>
              </tr>
            </tbody>
          </table>);
        N.push(<hr key={i}></hr>);
      }
    }

    if(number==0){
      N.push(<h1 className="Alert" key={"Alert"}>No Questions Found.</h1>);
    }

    const row1=(
      <div id="main1" className="main">
        <table>
          <thead>
            <tr id = "row11"> 
              <th id="N1" className="column1">{number} Questions</th>
              <th id="All1" className="column2">Search Results</th>
              <th id = "Ask1" className="column3"><button type="button" className = "AskA"
                onClick={this.AskChange}>Ask A Question</button></th>
            </tr>
          </thead>
        </table>
        <div id="N_Question1">{N}</div>
      </div>
    )
    return row1;
  }
}

function onkey(searchText, answers, tags, questions){
  let aSearch = searchText.split(" ");
  let nSearch = new Array(answers.length).fill(0);
  for(let i=0; i<aSearch.length; i++){
  if(aSearch[i].charAt(0)=="["){
      let sString = aSearch[i].substring(1, aSearch[i].length-1);
      for(let j=0; j<tags.length; j++){
        if(tags[j].name.toLowerCase() == sString.toLowerCase()){
          let tag = tags[j].tid;
          for(let x=0; x<questions.length; x++){
            for(let y=0; y<questions[x].tagIds.length; y++){
              if(questions[x].tagIds[y]==tag){
                nSearch[x]++;

                break;
              }
            }
          }

          break;
        }
      }
  }
  else{
      for(let j=0; j<questions.length; j++){
        if(questions[j].title.toLowerCase().indexOf(aSearch[i].toLowerCase()) != -1){
          nSearch[j]++;
        }
        else if(questions[j].text.toLowerCase().indexOf(aSearch[i].toLowerCase()) != -1){
          nSearch[j]++;
        }
      }
    }
  }

  return nSearch;
}

//____________________Answers Page_____________________//
class AnswerPage extends React.Component{
  constructor(props){
    super(props);
    this.AskChange = this.AskChange.bind(this);
    this.AnswerText = this.AnswerText.bind(this);
  }

  AskChange(){
    this.props.handleAskChange();
  }
  AnswerText(){
    this.props.handleAnswerText();
  }

  render(){
    let questions = this.props.state.model.data.questions;
    let answers = this.props.state.model.data.answers;
    let index = this.props.state.AnswersQid;
    const N=[];

    questions[index].views++;
    N.push(
    <table key={questions[index].qid}>
      <tbody>
        <tr>
          <td className="column1" rowSpan="3">{questions[index].views}  Views</td>
          <td className="column2" rowSpan="3">{questions[index].text}</td>
          <td className="column3"> Asked By <span className='askedBy'>{questions[index].askedBy}</span></td>
        </tr>
        <tr>
          <td className="column3"> On <span className='askedOn'>{questions[index].askedOn}</span></td>
        </tr>
        <tr>
          <td className="column3"> At <span className='askedAt'>{questions[index].askedAt}</span></td>
        </tr>
      </tbody>
    </table>
    );
    N.push(<hr key={index+'q'}></hr>);
    for(let i=questions[index].answers.length-1; i>=0; i--){
      for(let j=0; j<answers.length; j++){
        if(questions[index].answers[i] == answers[j].aid){
          N.push(
          <table key={answers[j].aid}>
            <tbody>
              <tr>
                <td className="answerstext" rowSpan="3">{answers[j].text}</td> 
                <td className="column3"> Asked By <span className='askedBy'>{answers[j].ansBy}</span></td>
              </tr>
              <tr>
                <td className="column3"> On <span className='askedOn'>{answers[j].ansOn}</span></td>
              </tr>
              <tr>
                <td className="column3"> At <span className='askedAt'>{answers[j].ansAt}</span></td>
              </tr>
            </tbody>
          </table>
          );
          N.push(<hr key={j}></hr>);
        }
      }
    }

    const row1 = (
      <div id="main2" className="main">
        <table>
          <thead>
            <tr id = "row12"> 
              <th id="N2" className="column1">{questions[index].answers.length} Answers</th>
              <th id="All2" className="column2">{questions[index].title}</th>
              <th id = "Ask2" className="column3"><button type="button" className = "AskA"
                onClick={this.AskChange}>Ask A Question</button></th>
            </tr>
          </thead>
        </table>
        <div id="N_Question2">{N}</div>
        <div>
          <button type="button" id="newAnswer" onClick={this.AnswerText}>Answer Question</button>
        </div>
      </div>
    )

    return row1;
  }
}


//____________________New Answer Page_____________________//
class AnswerText extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text: '',
      ansBy : '',
    }
    this.textChange = this.textChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.answerPost = this.answerPost.bind(this);
  }

  textChange(e){
    this.setState({text: e.target.value});
  }
  usernameChange(e){
    this.setState({ansBy: e.target.value});
  }

  answerPost(){
    if (this.state.text.trim() == "") {  
      this.props.handleAlertChange("Text should not be empty.");
    }
    else if (this.state.ansBy.trim() == "") {  
      this.props.handleAlertChange("Username should not be empty.");
    }
    else if(this.state.ansBy.length > 15){
      this.props.handleAlertChange("Username should not be more than 15 characters.");
    }
    else{
      let date = new Date()
      let answer={
        aid: 'a'+ (this.props.state.model.data.answers.length+1),
        text: this.state.text,
        ansBy : this.state.ansBy,
        ansOn: this.props.state.month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear(),
        ansAt: date.getHours()+":"+date.getMinutes(),
      }
              
      this.props.state.model.newAnswer(this.props.state.AnswersQid, answer);
      this.props.state.model.data.questions[this.props.state.AnswersQid].views--;
      this.props.handleAnswerQuestion();
      this.props.handleAlertChange('');
  
      this.setState({ text: '',
                      ansBy: '',
                    })
    }
  }

  render(){
    return (
    <div id="answerText">
      <h2>Answer Text</h2>
      <textarea type="text" id="aText" value={this.state.text} onChange={this.textChange}></textarea><br></br>
      <h2>Username</h2>
      <p>Should not be more than 15 characters.</p>
      <textarea type="text" id="aUsername" value={this.state.ansBy} onChange={this.usernameChange}></textarea><br></br>
      <button type="button" id="aPost" onClick={this.answerPost}> Post Answer</button>
    </div>
    )
  }
}

//____________________Tags Page_____________________//
class TagsPage extends React.Component{
  constructor(props){
    super(props);
    this.AskChange = this.AskChange.bind(this);
    this.TagsClick = this.TagsClick.bind(this);
  }

  AskChange(){
    this.props.handleDisplayChange(0);
    this.props.handleAskChange();
  }

  TagsClick(e){
    let a =e.target+"";
    this.props.handleDisplayChange(0);
    this.props.handleTagId(a.substring(a.indexOf("#t")+2));
    this.props.handleTagsQuestion();
  }

  render(){
    let tags=this.props.state.model.data.tags;
    let questions = this.props.state.model.data.questions;
    let n = new Array(tags.length).fill(0);
    let N =[];

    for(let i=0; i<questions.length; i++){
      for(let j=0; j<questions[i].tagIds.length; j++){
        n[questions[i].tagIds[j].substring(1)-1]++;
      }
    }
    for(let l=0; l<tags.length; l++){
      if((l+1)%3==0){
        N.push(<div className="tags" key={tags[l].tid}>
                  <a href={"#" + tags[l].tid} onClick={this.TagsClick}>{tags[l].name}</a>
                  <br></br><br></br>{n[l]} question
                </div>);
        N.push(<br key={l}></br>);
      }
      else{
        N.push(<div className="tags" key={tags[l].tid}>
                  <a href={"#"+tags[l].tid} onClick={this.TagsClick}>{tags[l].name}</a>
                  <br></br><br></br>{n[l]} question
                </div>);
      }
    }

    const row1 = (
      <div id="main3" className="main">
        <table>
          <thead>
            <tr id = "row13"> 
              <th id="N3" className="column1">{tags.length} Tags</th>
              <th id="All3" className="column2">All Tags</th>
              <th id = "Ask3" className="column3"><button type="button" className = "AskA"
                onClick={this.AskChange}>Ask A Question</button></th>
            </tr>
          </thead>
        </table>
        <div id="N_Question3">{N}</div>
      </div>
    )

    return row1;
  }
}

class TagsQuestion extends React.Component{
  constructor(props){
    super(props);
    this.AskChange = this.AskChange.bind(this);
    this.AnswersQidChange = this.AnswersQidChange.bind(this);
  }

  AskChange(e){
    this.props.handleAskChange(e.target.value);
  }

  AnswersQidChange(e){
    let a =e.target+"";
    let index = 0;
    let q="q"+a.substring(a.indexOf("#q")+2);
    for(let i=0; i<this.props.state.model.data.questions.length; i++){
      if(this.props.state.model.data.questions[i].qid == q){
        index = i;
        this.props.handleAnswersQidChange(index);
        this.props.handleAnswerQuestion();
        break;
      }
    }
  }

  render(){
    let number = 0;
    let tI = "t"+this.props.state.TagIndex;
    let data = this.props.state.model.data;
    let N=[];
    let tTT=0

    for(let i=data.questions.length-1; i>=0; i--){
      tTT=0;
      for(let j=0; j<data.questions[i].tagIds.length; j++){
        if(data.questions[i].tagIds[j] == tI){
          number++;
          N.push(
            <table key={data.questions[i].qid}>
              <tbody>
                <tr>
                  <td className="column1">{data.questions[i].views} Views</td>
                  <td className="column2"><a href={"#" + data.questions[i].qid} onClick={this.AnswersQidChange}>{data.questions[i].title}</a></td>
                  <td className="column3"> Asked By <span className='askedBy'>{data.questions[i].askedBy}</span></td>
                </tr>
                <tr>
                  <td className="column1" rowSpan="2">{data.questions[i].answers.length} Answers</td>
                  <td className="column2" rowSpan="2">{tagIdToTag(data, i, tTT)}</td>
                  <td className="column3"> On <span className='askedOn'>{data.questions[i].askedOn}</span></td>
                </tr>
                <tr>
                  <td className="column3"> At <span className='askedAt'>{data.questions[i].askedAt}</span></td>
                </tr>
              </tbody>
            </table>);
          break;
        }
      }
    }
    const row1 = (
      <div id="main4" className="main">
        <table>
          <thead>
            <tr id = "row14"> 
              <th id="N4" className="column1">{number} Qustions</th>
              <th id="All4" className="column2">Questions tagged [{data.tags[this.props.state.TagIndex-1].name}]</th>
              <th id = "Ask4" className="column3"><button type="button" className = "AskA"
                onClick={this.AskChange}>Ask A Question</button></th>
            </tr>
          </thead>
        </table>
        <div id="N_Question4">{N}</div>
      </div>
    )

    return row1;
  }
}