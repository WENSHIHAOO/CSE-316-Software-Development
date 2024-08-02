import React from 'react';
//____________________Answers Page_____________________//
export default class AnswerPage extends React.Component{
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
      let questions = this.props.state.AnswersQid;
      const N=[];
      N.push(
      <table key={'q0'}>
        <tbody>
          <tr>
            <td className="column1" rowSpan="3">{questions[0].views}  Views</td>
            <td className="column2" rowSpan="3">{questions[0].text}</td>
            <td className="column3"> Asked By <span className='askedBy'>{questions[0].askedBy}</span></td>
          </tr>
          <tr>
            <td className="column3"> On <span className='askedOn'>{questions[0].askedOn}</span></td>
          </tr>
          <tr>
            <td className="column3"> At <span className='askedAt'>{questions[0].askedAt}</span></td>
          </tr>
        </tbody>
      </table>
      );
      N.push(<hr key={'0q'}></hr>);
      for(let i=1; i<questions.length; i++){
        N.push(
        <table key={i+'q'}>
          <tbody>
            <tr>
              <td className="answerstext" rowSpan="3">{questions[i].text}</td> 
              <td className="column3"> Asked By <span className='askedBy'>{questions[i].ansBy}</span></td>
            </tr>
            <tr>
              <td className="column3"> On <span className='askedOn'>{questions[i].ansOn}</span></td>
            </tr>
            <tr>
              <td className="column3"> At <span className='askedAt'>{questions[i].ansAt}</span></td>
            </tr>
          </tbody>
        </table>
        );
        N.push(<hr key={i}></hr>);
      }
  
      const row1 = (
        <div id="main2" className="main">
          <table key={0}>
            <thead>
              <tr id = "row12"> 
                <th id="N2" className="column1">{questions.length-1} Answers</th>
                <th id="All2" className="column2">{questions[0].title}</th>
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