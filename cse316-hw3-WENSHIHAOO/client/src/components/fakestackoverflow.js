import React from 'react';
import Banner from './Banner';
import Row1 from './Row1';
import AskAQuestion from './AskAQuestion';
import Ksearch from './Ksearch';
import AnswerPage from './AnswerPage';
import AnswerText from './AnswerText';
import TagsPage from './TagsPage';
import axios from 'axios';

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
      AnswersQid: 0,
      AnswerPage: false,
      AnswerText: false,
      TagsPage: false,
      TagIndex:1,
      TagsQuestion:false,
      display:1,
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
      TagsQuestion: false});
  }
  handleSearchChange=async(e, n) =>{
    if(n){
      this.state.searchOrTag="Search Results";
    }
    else{
      this.state.searchOrTag = "Questions tagged "+e;
    }
    await axios.get('http://localhost:8000/get_search?id='+e).then(res => {this.state.nSearch = res.data});
    this.setState({
      Search:true,
      row1: false,
      Ask: false,
      AnswerPage:false,
      AnswerText: false,
      TagsPage: false,
      TagsQuestion: false});
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
      TagsQuestion: false,});
  }
  handleQSubmitChange= async(e)=>{
    e.ask_date_time=new Date();
    e.tags = this.handlekeywordChange(e.tags);
    await axios.post('http://localhost:8000/create_question', e);
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
    axios.get('http://localhost:8000/get_all_tag').then(res => {this.setState({tags:res.data})});
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
        state = {this.state}/>}

        {this.state.row1 ? <Row1 
        handleDisplayChange={this.handleDisplayChange}
        handleAnswerQuestion={this.handleAnswerQuestion}
        handleAskChange={this.handleAskChange}
        state = {this.state}/> : ''}

        <p className="Alert">{this.state.Alert}</p>
 
        {this.state.Ask ? <AskAQuestion 
        handleDisplayChange={this.handleDisplayChange}
        handleQSubmitChange = {this.handleQSubmitChange}
        handleAlertChange = {this.handleAlertChange}
        state = {this.state}/> 
        : ''}

        {this.state.Search ? <Ksearch 
        handleAnswerQuestion={this.handleAnswerQuestion}
        handleAskChange={this.handleAskChange}
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
        handleSearchChange={this.handleSearchChange}
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