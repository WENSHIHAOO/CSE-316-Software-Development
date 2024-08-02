import React from 'react';
//____________________All Questions Page______________________//
export default class Row1 extends React.Component{
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
      let q=a.substring(a.indexOf("#")+1);
      for(let i=0; i<this.props.state.questions.length; i++){
        if(q===this.props.state.questions[i]._id.toString()){
          this.props.handleDisplayChange(0);
          this.props.handleAnswerQuestion(this.props.state.questions[i]._id, 0);
          break;
        }
      }
    }
  
    N_Question(questions){
      const N = [];
      let tTT=0;
      for(let i=questions.length-1; i>=0; i--){
        tTT=0;
        N.push(
          <table key={questions[i]._id}>
            <tbody>
              <tr>
                <td className="column1">{questions[i].views} Views</td>
                <td className="column2"><a href={"#" + questions[i]._id} onClick={this.AnswersQidChange}>{questions[i].title}</a></td>
                <td className="column3"> Asked By <span className='askedBy'>{questions[i].askedBy}</span></td>
              </tr>
              <tr>
                <td className="column1" rowSpan="2">{questions[i].answers.length} Answers</td>
                <td className="column2" rowSpan="2">{tagIdToTag(questions, i, tTT, this.props.state.tags)}</td>
                <td className="column3"> On <span className='askedOn'>{questions[i].askedOn}</span></td>
              </tr>
              <tr>
                <td className="column3"> At <span className='askedAt'>{questions[i].askedAt}</span></td>
              </tr>
            </tbody>
          </table>);
          N.push(<hr key={i}></hr>);
      }
      return N;
    }

    render(){
      return(
      <div id="main" className="main">
        <table>
          <thead>
            <tr id = "row1"> 
              <th id="N" className="column1">{this.props.state.questions.length} Questions</th>
              <th id="All" className="column2">All Questions</th>
              <th id = "Ask" className="column3"><button type="button" className = "AskA"
                onClick={this.AskChange}>Ask A Question</button></th>
            </tr>
          </thead>
        </table>
        <div id="N_Question">{this.N_Question(this.props.state.questions)}</div>
      </div>
      )
    }
  }

  function tagIdToTag(questions, x, tTT, tag){
    const N=[];
    for(let j=0; j<questions[x].tagIds.length; j++){
      for(let i=0; i<tag.length; i++){
        if(tag[i]._id===questions[x].tagIds[j]){
          tTT++;
          if(tTT%4===0){
            N.push(<span className="name" key={tag[i].name}>{tag[i].name}</span>);
            N.push(<br key={"t"+i}></br>);
            continue;
          }
          N.push(<span className="name" key={tag[i].name}>{tag[i].name}</span>);
        }
      }
    }
    return N;
  }