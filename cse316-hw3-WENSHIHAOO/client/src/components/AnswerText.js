import React from 'react';
//____________________New Answer Page_____________________//
export default class AnswerText extends React.Component{
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
      if (this.state.text.trim() === "") {  
        this.props.handleAlertChange("Text should not be empty.");
      }
      else if (this.state.ansBy.trim() === "") {  
        this.props.handleAlertChange("Username should not be empty.");
      }
      else if(this.state.ansBy.length > 15){
        this.props.handleAlertChange("Username should not be more than 15 characters.");
      }
      else{
        let date = new Date()
        let answer={
          text: this.state.text,
          ans_by : this.state.ansBy,
          ans_date_time: date,
        }
        let qAns = {
          qId: this.props.state.AnswersQid[0]._id,
          ans: answer,
        }

        this.props.handleAnswerQuestion(qAns, 1);
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