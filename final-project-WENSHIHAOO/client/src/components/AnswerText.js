import React from 'react';
//____________________New Answer Page_____________________//
export default class AnswerText extends React.Component{
    constructor(props){
      super(props);
      this.state={
        text: '',
      }
      if(this.props.state.AnswerEdit){
        this.state.text = this.props.state.profile.ans[this.props.state.AnswerE].text;
      }
      this.textChange = this.textChange.bind(this);
      this.answerPost = this.answerPost.bind(this);
      this.handleAEdit = this.handleAEdit.bind(this);
    }
  
    handleAEdit(){
      if (this.state.text.trim() === "") {  
        this.props.handleAlertChange("Text should not be empty.");
      }
      else{
        this.props.handleAnswerEdit(this.state.text);
        this.props.handleAlertChange('');
    
        this.setState({ text: '',
                      })
      }
    }

    textChange(e){
      this.setState({text: e.target.value});
    }
  
    answerPost(){
      if (this.state.text.trim() === "") {  
        this.props.handleAlertChange("Text should not be empty.");
      }
      else{
        let date = new Date()
        let answer={
          text: this.state.text,
          ans_by : this.props.state.userid,
          ans_date_time: date,
        }
        let qAns = {
          qId: this.props.state.AnswersQid[0]._id,
          ans: answer,
        }

        this.props.handleAnswerQuestion(qAns, 1);
        this.props.handleAlertChange('');
    
        this.setState({ text: '',
                      })
      }
    }
    render(){
      return (
      <div id="answerText">
        <h2>Answer Text</h2>
        <textarea type="text" id="aText" value={this.state.text} onChange={this.textChange}></textarea><br></br>
        {this.props.state.AnswerEdit?<button type="button" id="aPost" onClick={this.handleAEdit}>Edit Answer</button>:
        <button type="button" id="aPost" onClick={this.answerPost}> Post Answer</button>}
      </div>
      )
    }
  }