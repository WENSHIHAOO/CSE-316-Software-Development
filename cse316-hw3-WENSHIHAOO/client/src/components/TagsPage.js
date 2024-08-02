import React from 'react';
//____________________Tags Page_____________________//
export default class TagsPage extends React.Component{
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
      let a = e.target+"";
      a = a.substring(a.indexOf("#")+1);
      a = "["+a+"]";
      this.props.handleDisplayChange(0);
      this.props.handleSearchChange(a, false);
    }
  
    render(){
      let tags=this.props.state.tags;
      let questions = this.props.state.questions;
      let n = new Array(tags.length).fill(0);
      let N =[];
  
      for(let i=0; i<questions.length; i++){
        for(let j=0; j<questions[i].tagIds.length; j++){
          for(let x=0; x<tags.length; x++){
            if(tags[x]._id===questions[i].tagIds[j]){
              n[x]++;
            }
          }
        }
      }

      for(let l=0; l<tags.length; l++){
        if((l+1)%3===0){
          N.push(<div className="tags" key={tags[l]._id}>
                    <a href={"#" + tags[l].name} onClick={this.TagsClick}>{tags[l].name}</a>
                    <br></br><br></br>{n[l]} question
                  </div>);
          N.push(<br key={l}></br>);
        }
        else{
          N.push(<div className="tags" key={tags[l]._id}>
                    <a href={"#"+tags[l].name} onClick={this.TagsClick}>{tags[l].name}</a>
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