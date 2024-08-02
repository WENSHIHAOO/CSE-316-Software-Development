import React from 'react';
//____________________New Question Page______________________//
export default class AskAQuestion extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        title: "",
        summary: "",
        text: "",
        tags: [],
        asked_by : "",
        ask_date_time: "",
        answers:[],
        votes: 0,
        views: 0,
      }

      if(this.props.state.QuestionEdit){
        this.state.title = this.props.state.profile.qus[this.props.state.QuestionE].title;
        this.state.summary = this.props.state.profile.qus[this.props.state.QuestionE].summary;
        this.state.text = this.props.state.profile.qus[this.props.state.QuestionE].text;
        this.state.tags = tagIdToTagText(this.props.state.profile.qus[this.props.state.QuestionE].tagIds, this.props.state.tags);
      }

      this.titleChange = this.titleChange.bind(this);
      this.detailChange = this.detailChange.bind(this);
      this.keywordChange = this.keywordChange.bind(this);
      this.handleQSubmit = this.handleQSubmit.bind(this);
      this.summaryChange = this.summaryChange.bind(this);
      this.handleQEdit = this.handleQEdit.bind(this);
    }

    handleQEdit(){
      if (this.state.title.trim() === "") {
        this.props.handleAlertChange("Titile should not be empty.");
       }
      else if (this.state.title.length > 50) {
        this.props.handleAlertChange("Titile should not be more than 50 characters.");
      }
      else if (this.state.summary.trim() === "") {
        this.props.handleAlertChange("Summary should not be empty.");
       }
      else if (this.state.summary.length > 140) {
        this.props.handleAlertChange("Summary should not be more than 140 characters.");
      }
      else if (this.state.text.trim() === "") {  
        this.props.handleAlertChange("Detail should not be empty.");
      }
      else if (this.state.tags.trim() === "") {  
        this.props.handleAlertChange("Keyword should not be empty.");
      }
      else{
        let tags = this.props.handlekeywordChange(this.state.tags);
        if(this.props.state.reputation<100){
          if(newTag(tags, this.props.state.tags)){
            this.props.handleAlertChange("A new tag name can only be created by a user with reputation 100 or more.");
          }
          else{
            this.state.tags=tags;
            this.props.handleQuestionEdit(this.state);
            this.props.handleAlertChange('');
            this.setState({ 
            title: "",
            summary: "",
            text: "",
            tags: "",
            asked_by : "",
            ask_date_time: "",
            answers:[],
            votes:0,
            views: 0,});
          }
        }
        else{
          this.state.tags=tags;
          this.props.handleQuestionEdit(this.state);
          this.props.handleAlertChange('');
          this.setState({ 
          title: "",
          summary: "",
          text: "",
          tags: "",
          asked_by : "",
          ask_date_time: "",
          answers:[],
          votes:0,
          views: 0,});
        }
      }
    }

    titleChange(e){
      this.setState({title: e.target.value});
    }
    detailChange(e){
      this.setState({text: e.target.value});
    }
    keywordChange(e){
      this.setState({tags: e.target.value});
    }
    summaryChange(e){
      this.setState({summary: e.target.value});
    }
  
    handleQSubmit(){
      if (this.state.title.trim() === "") {
        this.props.handleAlertChange("Titile should not be empty.");
       }
      else if (this.state.title.length > 50) {
        this.props.handleAlertChange("Titile should not be more than 50 characters.");
      }
      else if (this.state.summary.trim() === "") {
        this.props.handleAlertChange("Summary should not be empty.");
      }
      else if (this.state.summary.length > 140) {
        this.props.handleAlertChange("Summary should not be more than 140 characters.");
      }
      else if (this.state.text.trim() === "") {  
        this.props.handleAlertChange("Detail should not be empty.");
      }
      else if (this.state.tags.trim() === "") {  
        this.props.handleAlertChange("Keyword should not be empty.");
      }
      else{
        let tags = this.props.handlekeywordChange(this.state.tags);
        if(this.props.state.reputation<100){
          if(newTag(tags, this.props.state.tags)){
            this.props.handleAlertChange("A new tag name can only be created by a user with reputation 100 or more.");
          }
          else{
            this.state.tags=tags;
            this.props.handleDisplayChange(1);
            this.props.handleQSubmitChange(this.state);
            this.props.handleAlertChange('');
            this.setState({ 
            title: "",
            summary: "",
            text: "",
            tags: "",
            asked_by : "",
            ask_date_time: "",
            answers:[],
            votes:0,
            views: 0,});
          }
        }
        else{
          this.state.tags=tags;
          this.props.handleDisplayChange(1);
          this.props.handleQSubmitChange(this.state);
          this.props.handleAlertChange('');
          this.setState({ 
          title: "",
          summary: "",
          text: "",
          tags: "",
          asked_by : "",
          ask_date_time: "",
          answers:[],
          votes:0,
          views: 0,});
        }
      }
    }
    render(){
      return  <div id="AskAQuestion">
      <h2>Question Title</h2>
      <p>Title should not be more than 50 characters.</p>
      <textarea type="text" id="title" value={this.state.title} onChange={this.titleChange}></textarea><br></br>

      <h2>Question Summary</h2>
      <p>Summary should not be more than 140 characters.</p>
      <textarea type="text" id="summary" value={this.state.summary} onChange={this.summaryChange}></textarea><br></br>

      <h2>Question Text</h2>
      <p>Add details.</p>
      <textarea type="text" id="detail" value={this.state.text} onChange={this.detailChange}></textarea><br></br>
  
      <h2>Tags</h2>
      <p>Add Keywords separated by whitespace.</p>
      <textarea type="text" id="keyword" value={this.state.tags} onChange={this.keywordChange}></textarea><br></br>

      {this.props.state.QuestionEdit?<button type="button" id="submit" onClick={this.handleQEdit}>Edit Question</button>:
      <button type="button" id="submit" onClick={this.handleQSubmit}>Post Question</button>}
    </div>
    }
  }

  function newTag(tags, All){
    for(let j=0; j<tags.length; j++){
      let tag = false;
      for(let i=0; i<All.length; i++){
        if(All[i].name===tags[j]){
            tag = true;
            break;
        }
      }
      
      if(tag){
        continue;
      }
      return true;
    }
    return false;
  }

  function tagIdToTagText(tagIds, tag){
    let N='';
    for(let j=0; j<tagIds.length; j++){
      for(let i=0; i<tag.length; i++){
        if(tag[i]._id===tagIds[j]){
          N=N+tag[i].name+" ";
        }
      }
    }
    return N;
  }