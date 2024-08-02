import React from 'react';
//____________________Tags Page_____________________//
export default class TagsPage extends React.Component{
    constructor(props){
      super(props);
      this.state={
        tag: '',
      }
      this.AskChange = this.AskChange.bind(this);
      this.TagsClick = this.TagsClick.bind(this);
      this.delete = this.delete.bind(this);
      this.edit = this.edit.bind(this);
      this.editChange = this.editChange.bind(this);
      this.tSubmit = this.tSubmit.bind(this);
    }
    editChange(e){
      this.setState({tag: e.target.value});
    }

    tSubmit(){
      if (this.state.tag.trim() === "") {  
        this.props.handleAlertChange("tag should not be empty.");
      }
      else if(this.state.tag.indexOf(' ') !== -1){
        this.props.handleAlertChange("tag should not have space.");
      }
      else{
        if(this.props.state.reputation<100){
          if(newTag(this.state.tag, this.props.state.tags)){
            this.props.handleAlertChange("A new tag name can only be created by a user with reputation 100 or more.");
          }
          else{
            this.props.handleTagEdit(this.state.tag);
            this.props.handleAlertChange('');
            this.setState({ 
            tag:''});
          }
        }
        else{
          this.props.handleTagEdit(this.state.tag);
          this.props.handleAlertChange('');
          this.setState({ 
            tag:''});
        }
      }
    }

    edit(e){
      this.props.handleTagEditPage(e);
    }

    delete(e){
      this.props.handleTagDelete(e);    
    }
  
    AskChange(){
      if(this.props.state.username===''){
        this.props.handleAlertChange("You must be logged in to ask a question");
      }
      else{
        this.props.handleDisplayChange(0);
        this.props.handleAskChange();
      }
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
                    {this.props.state.TagEdit && this.props.state.TagE===l?
                    <span><br></br><br></br><input type="text" onChange ={this.editChange}/><button onClick={this.tSubmit}>Edit Tag</button></span>:''}
                    <br></br><br></br>{n[l]} question<br></br>
                    {this.props.state.ProfilePage?
                    <span>
                      <button onClick={()=> this.delete(l)}>delete</button>
                      <button onClick={()=> this.edit(l)}>edit</button>
                    </span>:''}
                  </div>);
          N.push(<br key={l}></br>);
        }
        else{
          N.push(<div className="tags" key={tags[l]._id}>
                    <a href={"#"+tags[l].name} onClick={this.TagsClick}>{tags[l].name}</a>
                    {this.props.state.TagEdit && this.props.state.TagE===l?
                    <span><br></br><br></br><input type="text" onChange ={this.editChange}/><button onClick={this.tSubmit}>Edit Tag</button></span>:''}
                    <br></br><br></br>{n[l]} question<br></br>
                    {this.props.state.ProfilePage? <span>
                      <button onClick={()=> this.delete(l)}>delete</button>
                      <button onClick={()=> this.edit(l)}>edit</button></span>:''
                    }
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

function newTag(tag, All){
  for(let i=0; i<All.length; i++){
    if(All[i].name===tag){
      return true
    }
  }
  return false;
}