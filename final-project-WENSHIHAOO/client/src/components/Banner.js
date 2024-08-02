import React from 'react';
//____________________Banner______________________//
export default class Banner extends React.Component{
    constructor(props){
      super(props);
      this.state={
        search:'',
      }
      this.SearchChange = this.SearchChange.bind(this);
      this.QuestionChange = this.QuestionChange.bind(this);
      this.TagsChange = this.TagsChange.bind(this);
      this.SearchKeyDown = this.SearchKeyDown.bind(this);
      this.LoginChange = this.LoginChange.bind(this);
      this.SignupChange = this.SignupChange.bind(this);
      this.LogoutChange = this.LogoutChange.bind(this);
      this.UserProfile = this.UserProfile.bind(this);
    }
    SearchChange(e){
      this.setState({search: e.target.value});
    }
    SearchKeyDown(e){
      if(e.keyCode === 13){
        this.props.handleDisplayChange(0);
        this.props.handleSearchChange(this.state.search, true);
      }
    }
    QuestionChange(){
      this.props.handleDisplayChange(1);
      this.props.handleRow1Change();
    }
    TagsChange(){
      this.props.handleDisplayChange(2);
      this.props.handleTagsPage();
    }
    LoginChange(){
      this.props.handleDisplayChange(0);
      this.props.handleShowLogin();
    }
    SignupChange(){
      this.props.handleDisplayChange(0);
      this.props.handleShowSignup();
    }
    LogoutChange(){
      this.props.handleLogout();
    }

    UserProfile(){
      this.props.handleDisplayChange(0);
      this.props.handleShowProfile();
    }
  
    render(){
      return(
      <div id="banner" className="banner" >
        <a id="Question" href={"#Question"} onClick={this.QuestionChange} style={{backgroundColor: this.props.state.display===1 ? '#0281E8' : ''}}>Questions</a>
        <a id="Tags" href={"#Tags"} onClick={this.TagsChange} style={{backgroundColor: this.props.state.display===2 ? '#0281E8' : ''}}>Tags</a>
        <h1>Fake Stack Overflow</h1>
        <input type="text" placeholder="Search..." id="search"
                onKeyDown={this.SearchKeyDown} onChange ={this.SearchChange}/>
        {this.props.state.username==='' ?
          <>
            <span className="span">
              <span id="word">Welcome</span><br></br> <button onClick={this.LoginChange}>Log in</button>
            </span>
            <span className="span">
              <span id="word1">Guest</span> <br></br><button onClick={this.SignupChange}>Sign up</button>
            </span>
          </>
          : 
          <span>
            <a id="user" href={"#User"} onClick={this.UserProfile}>{this.props.state.username}</a>
            <button id="Logout" onClick={this.LogoutChange}>Log out</button>
          </span>
        }
      </div>
      );
    }
  }