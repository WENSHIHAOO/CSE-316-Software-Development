import React from 'react';
//____________________New Question Page______________________//
export default class AskAQuestion extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        title: "",
        text: "",
        tags: "",
        asked_by : "",
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
      this.setState({tags: e.target.value});
    }
    usernameChange(e){
      this.setState({asked_by: e.target.value});
    }
  
    handleQSubmit(){
      if (this.state.title.trim() === "") { 
        this.props.handleAlertChange("Titile should not be empty.");
       }
      else if (this.state.title.length > 100) {
        this.props.handleAlertChange("Titile should not be more than 100 characters.");
      }
      else if (this.state.text.trim() === "") {  
        this.props.handleAlertChange("Detail should not be empty.");
      }
      else if (this.state.tags.trim() === "") {  
        this.props.handleAlertChange("Keyword should not be empty.");
      }
      else if (this.state.asked_by.trim() === "") {  
        this.props.handleAlertChange("Username should not be empty.");
      }
      else if (this.state.asked_by.length > 15) {
        this.props.handleAlertChange("Username should not be more than 15 characters.");
      }
      else{
        this.props.handleDisplayChange(1);
        this.props.handleQSubmitChange(this.state);
        this.props.handleAlertChange('');
        this.setState({ 
        title: "",
        text: "",
        tags: "",
        asked_by : "",
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
      <textarea type="text" id="keyword" value={this.state.tags} onChange={this.keywordChange}></textarea><br></br>
  
      <h2>Username</h2>
      <p>Should not be more than 15 characters.</p>
      <textarea type="text" id="username" value={this.state.asked_by} onChange={this.usernameChange}></textarea><br></br>
  
      <button type="button" id="submit" onClick={this.handleQSubmit}>
        Post Question</button>
    </div>
    }
  }