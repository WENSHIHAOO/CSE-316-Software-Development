import React from 'react';
export default class Login extends React.Component{
    constructor(props){
      super(props);
      this.state={
        email: '',
        password : '',
      }
      this.emailChange = this.emailChange.bind(this);
      this.passwordChange = this.passwordChange.bind(this);
      this.login = this.login.bind(this);
    }
    emailChange(e){
        this.setState({email: e.target.value});
    }
    passwordChange(e){
        this.setState({password: e.target.value});
    }
    
    login(){
        if (this.state.email.trim() === "") {  
            this.props.handleAlertChange("Email should not be empty.");
        }
        else if(this.state.email.indexOf('@')=== -1 || this.state.email.substring(this.state.email.length-4) !== ".com"){
            this.props.handleAlertChange("The email is not a valid email address.");
        }
        else if (this.state.password.trim() === "") {  
            this.props.handleAlertChange("Password should not be empty.");
        }
        else{
            
            this.props.handleLogin(this.state);
            this.props.handleAlertChange('');
        
            this.setState({ email: '',
                            password: '',
                        })
        }
    }

    render(){
        return (
        <div className="inup">
            <h2>Email</h2>
            <input type="text" className="email" value={this.state.email} onChange={this.emailChange}></input><br></br>
            <h2>Password</h2>
            <input type="text" className="password" value={this.state.password.replace(/./g, "*")} onChange={this.passwordChange}></input><br></br>
            <button type="button"  onClick={this.login}>Log in</button>
        </div>
        )
    }
}