import React from 'react';
//____________________Searching______________________//
export default class Ksearch extends React.Component{
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
      let q=a.substring(a.indexOf("#")+1);
      for(let i=0; i<this.props.state.questions.length; i++){
        if(q===this.props.state.questions[i]._id.toString()){
          this.props.handleAnswerQuestion(this.props.state.questions[i]._id, 0);
          break;
        }
      }
    }
   
    render(){
      let nSearch =this.props.state.nSearch;
      let number =0;
      const N = [];
      let tTT=0;
      for(let i=nSearch.length-1; i>=0; i--){
        if(nSearch[i] !== 0){
          number++;
          tTT=0;
          N.push(
            <table key={"s"+nSearch[i]._id}>
              <tbody>
                <tr>
                  <td className="column1">{nSearch[i].views} Views</td>
                  <td className="column2"><a href={"#" + nSearch[i]._id} onClick={this.AnswersQidChange}>{nSearch[i].title}</a></td>
                  <td className="column3"> Asked By <span className='askedBy'>{nSearch[i].askedBy}</span></td>
                </tr>
                <tr>
                  <td className="column1" rowSpan="2">{nSearch[i].answers.length} Answers</td>
                  <td className="column2" rowSpan="2">{tagIdToTag(nSearch, i, tTT, this.props.state.tags)}</td>
                  <td className="column3"> On <span className='askedOn'>{nSearch[i].askedOn}</span></td>
                </tr>
                <tr>
                  <td className="column3"> At <span className='askedAt'>{nSearch[i].askedAt}</span></td>
                </tr>
              </tbody>
            </table>);
          N.push(<hr key={i}></hr>);
        }
      }
  
      if(number===0){
        N.push(<h1 className="Alert" key={"Alert"}>No Questions Found.</h1>);
      }
      
      const row1=(
        <div id="main1" className="main">
          <table>
            <thead>
              <tr id = "row11"> 
                <th id="N1" className="column1">{number} Questions</th>
                <th id="All1" className="column2">{this.props.state.searchOrTag}</th>
                <th id = "Ask1" className="column3"><button type="button" className = "AskA"
                  onClick={this.AskChange}>Ask A Question</button></th>
              </tr>
            </thead>
          </table>
          <div id="N_Question1">{N}</div>
        </div>
      )
      nSearch =this.props.state.nSearch;
      return row1;
    }
  }
  
  function tagIdToTag(nSearch, x, tTT, tag){
    const N=[];
    for(let j=0; j<nSearch[x].tagIds.length; j++){
      for(let i=0; i<tag.length; i++){
        if(tag[i]._id === nSearch[x].tagIds[j]){
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