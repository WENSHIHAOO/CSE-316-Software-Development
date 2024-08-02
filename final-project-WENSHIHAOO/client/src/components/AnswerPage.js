import React from 'react';
//____________________Answers Page_____________________//
export default class AnswerPage extends React.Component{
    constructor(props){
      super(props);
      this.state={
        comment: new Array(this.props.state.AnswersQid.length).fill(""),
        comSize:  new Array(this.props.state.AnswersQid.length).fill(0),
      }
      this.AskChange = this.AskChange.bind(this);
      this.AnswerText = this.AnswerText.bind(this);
      this.add5Answers = this.add5Answers.bind(this);
      this.minus5Answers = this.minus5Answers.bind(this);
      this.addVote = this.addVote.bind(this);
      this.minusVote = this.minusVote.bind(this);
      this.commentChange = this.commentChange.bind(this);
      this.commentKeyDown = this.commentKeyDown.bind(this);
      this.add3Comment = this.add3Comment.bind(this);
      this.minus3Comment = this.minus3Comment.bind(this);
      this.delete = this.delete.bind(this);
      this.edit = this.edit.bind(this);
    }
    edit(e){
      this.props.handleAnswerEditPage(e);
    }
  
    delete(e){
      this.props.handleAnswerDelete(e); 
    }

    AskChange(){
      if(this.props.state.username===''){
        this.props.handleAlertChange("You must be logged in to ask a question");
      }
      else{
        this.props.handleAskChange();
      }
    }
    AnswerText(){
      if(this.props.state.username===''){
        this.props.handleAlertChange("You must be logged in to answer");
      }
      else{
        this.props.handleAnswerText();
      }
    }

    add5Answers(){
      this.props.handle5Answers(0);
    }

    minus5Answers(){
      this.props.handle5Answers(1);
    }

    addVote(e){
      if(this.props.state.reputation<100){
          this.props.handleAlertChange(" The user can vote if their reputation is 100 or more.");
      }
      else{
        let a =e.target+"";
        let q=a.substring(a.indexOf("#")+1);
        this.props.handleVote(q, 1)
      }
    }

    minusVote(e){
      if(this.props.state.reputation<100){
        this.props.handleAlertChange(" The user can vote if their reputation is 100 or more.");
      }
      else{
        let a =e.target+"";
        let q=a.substring(a.indexOf("#")+1);
        this.props.handleVote(q, 0)
      }
    }
    
    commentChange(e, i){
      let comment = this.state.comment;
      comment[i] = e.target.value;
      this.setState({comment: comment});
    }
    commentKeyDown(e, i){
      if(e.keyCode === 13){
        let comment = this.state.comment;
        if(this.props.state.reputation<100){
          this.props.handleAlertChange("The user add a new comment if their reputation is 100 or more.");
        }
        else if(comment[i].length>140){
          this.props.handleAlertChange("Comment should not be more than 140 characters.");
        }
        else{
          this.props.handleComment(i, comment[i])
        }
        comment[i]='';
        this.setState({
          comment: comment,
        })
      }
    }

    add3Comment(i){
      let comSize = this.state.comSize;
      comSize[i]=comSize[i]+3;
      this.setState({
        comSize: comSize,
      })
    }

    minus3Comment(i){
      let comSize = this.state.comSize;
      comSize[i]=comSize[i]-3;
      this.setState({
        comSize: comSize,
      })
    }

    render(){ 
      let size=0;
      let csize = new Array(this.props.state.AnswersQid.length).fill(0);
        
      if(this.props.state.AnswerSize+5>=this.props.state.AnswersQid.length){
        size = this.props.state.AnswersQid.length;
      }
      else{
        size = this.props.state.AnswerSize+5;
      }

      let questions = this.props.state.AnswersQid;
      const N=[];

      if(questions[0]!==0){
        N.push(
        <table key={'q0'}>
          <tbody>
            <tr>
              <td className="column1">{questions[0].views}  Views</td>
              <td className="column2" rowSpan="2">{questions[0].text}</td>
              <td className="column3"> Asked By <span className='askedBy'>{questions[0].askedBy.name}</span></td>
            </tr>
            <tr>
              <td className="column1" rowSpan="2"><span>{questions[0].votes} Votes</span><br></br>
              <a className="vote" href={"#" + 0} onClick={this.addVote}>+</a><a className="vote" href={"#" + 0} onClick={this.minusVote}>-</a></td>
              <td className="column3"> On <span className='askedOn'>{questions[0].askedOn}</span></td>
            </tr>
            <tr>
              <td className="column2">{tagIdToTag(questions[0], 0, this.props.state.tags)}</td>
              <td className="column3"> At <span className='askedAt'>{questions[0].askedAt}</span></td>
            </tr>
          </tbody>
        </table>
        );
        N.push(<hr key={0+'i'} className="comhr"></hr>);
        N.push(<span key={'comment'+0}>{showComment(questions[0].comments, this.state.comSize[0], csize[0])}</span>)
        N.push(<span className="compn" key={'p'+0}>{this.state.comSize[0]-3>=0 ? 
          <button className="comWork" onClick={()=>this.minus3Comment(0)}>prev</button>
        : <button className="comNotWork" >prev</button>}</span>);
        N.push(<span className="compn" key={'n'+0}>{this.state.comSize[0]+3<questions[0].comments.length ? 
          <button className="comWork" onClick={()=>this.add3Comment(0)}>next</button>
        : <button className="comNotWork">next</button>}</span>);
        N.push(<input className='commentInput' key={"input"+0} type="text" value={this.state.comment[0]} placeholder="Add a comment" onKeyDown={(e)=>{this.commentKeyDown(e, 0)}} onChange ={(e)=>{this.commentChange(e, 0)}}/>);
        N.push(<br key={'b'+0}></br>);
        N.push(<hr key={'0q'} className="hr"></hr>);
      }

      for(let i=this.props.state.AnswerSize; i<size; i++){
        N.push(
        <table key={i+'q'}>
          <tbody>
            <tr>
              <td className="column1" rowSpan="3"><span>{questions[i].votes} Votes</span><br></br>
              <a className="vote" href={"#" + i} onClick={this.addVote}>+</a><a className="vote" href={"#" + i} onClick={this.minusVote}>-</a></td>
              <td rowSpan="3"> <div className="answerstext">{questions[i].text}</div></td> 
              <td className="column3"> Asked By <span className='askedBy'>{questions[i].ansBy.name}</span></td>
            </tr>
            <tr>
              <td className="column3"> On <span className='askedOn'>{questions[i].ansOn}</span></td>
            </tr> 
            <tr>
              <td className="column3"> At <span className='askedAt'>{questions[i].ansAt}</span></td>
            </tr>
            <tr>
                <td>
                  {this.props.state.ProfilePage? <span>
                  <button onClick={()=> this.delete(i)}>delete</button>
                  <button onClick={()=> this.edit(i)}>edit</button></span>:''
                  }
                </td>
              </tr>
          </tbody>
        </table>
        );
        N.push(<hr key={i+'i'} className="comhr"></hr>);
        N.push(<span key={'comment' +i}>{showComment(questions[i].comments, this.state.comSize[i], csize[i])}</span>)
        N.push(<span className="compn" key={'p'+i}>{this.state.comSize[i]-3>=0 ? 
          <button className="comWork" onClick={()=>this.minus3Comment(i)}>prev</button>
        : <button className="comNotWork">prev</button>}</span>);
        N.push(<span className="compn" key={'n'+i}>{this.state.comSize[i]+3<questions[i].comments.length ? 
          <button className="comWork" onClick={()=>this.add3Comment(i)}>next</button>
        : <button className="comNotWork">next</button>}</span>);
        N.push(<input className='commentInput' key={"input"+i} type="text" value={this.state.comment[i]} placeholder="Add a comment" onKeyDown={(e)=>{this.commentKeyDown(e, i)}} onChange ={(e)=>{this.commentChange(e, i)}}/>);
        N.push(<br key={'b'+i}></br>);
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
            {this.props.state.AnswerSize-5>=0 ? 
              <button className="pnWork" style={{float: 'left'}} onClick={this.minus5Answers}>prev</button>
            : <button className="pnNotWork" style={{float: 'left'}} >prev</button>}
            {this.props.state.AnswerSize+5<this.props.state.AnswersQid.length ? 
              <button className="pnWork" style={{float: 'right'}} onClick={this.add5Answers}>next</button>
            : <button className="pnNotWork" style={{float: 'right'}} >next</button>}
          </div>
          <div>
            <button type="button" id="newAnswer" onClick={this.AnswerText}>Answer Question</button>
          </div>
        </div>
      )
  
      return row1;
    }
  }

  function tagIdToTag(questions, tTT, tag){
    const N=[];
    for(let j=0; j<questions.tagIds.length; j++){
      for(let i=0; i<tag.length; i++){
        if(tag[i]._id===questions.tagIds[j]){
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

  function showComment(comments, comSize, csize){  
    if(comSize+3>=comments.length){
      csize = comments.length;
    }
    else{
      csize = comSize+3;
    }

    const C = [];
    for(let i=comSize; i<csize; i++){
      C.push(<span className="commentText" key={i+'t'}>{comments[i].text} - </span>);
      C.push(<span className='askedBy' key={i+'b'}>{comments[i].com_by.name} - </span>);
      C.push(<span className='askedOn' key={i+'o'}>{comments[i].com_date_time}</span>);
      C.push(<hr key={i+'h'} className="comhr"></hr>);
    }
    return C;
  }