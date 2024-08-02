import React from 'react';
export default class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            email: '',
            password : '',
            reputation: 0,
            user_date_time: '',
            user_ans: [],
            user_qus: [],
        }
        this.nameChange = this.nameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.signup = this.signup.bind(this);
        }
        nameChange(e){
            this.setState({name: e.target.value});
        }
        emailChange(e){
            this.setState({email: e.target.value});
        }
        passwordChange(e){
            this.setState({password: e.target.value});
        }
        
        signup(){
            if(this.state.name.trim() === "") {  
                this.props.handleAlertChange("Display name should not be empty.");
            }
            else if (this.state.email.trim() === "") {  
                this.props.handleAlertChange("Email should not be empty.");
            }
            else if(this.state.email.indexOf('@')=== -1 || this.state.email.substring(this.state.email.trim().length-4) !== ".com"){
                this.props.handleAlertChange("The email is not a valid email address.");
            }
            else if (this.state.password.trim() === "") {  
                this.props.handleAlertChange("Password should not be empty.");
            }
            else if(this.state.password.trim().indexOf(this.state.email.trim().substring(0, this.state.email.trim().indexOf('@'))) !== -1
            || this.state.password.trim().indexOf(this.state.name.trim()) !== -1){
                this.props.handleAlertChange("Password should not contain the username or the email id.");
            }
            else{
                this.props.handleSignup(this.state);
                this.props.handleAlertChange('');
            
                this.setState({ name: '',
                                email: '',
                                password: '',
                            })
            }
        }
    
        render(){
            return (
            <div className="inup">
                <h2>Display name</h2>
                <input type="text" value={this.state.name} onChange={this.nameChange}></input><br></br>
                <h2>Email</h2>
                <input type="text" className="email" value={this.state.email} onChange={this.emailChange}></input><br></br>
                <h2>Password</h2>
                <input type="text" className="password" value={this.state.password.replace(/./g, "*")} onChange={this.passwordChange}></input><br></br>
                <button type="button" onClick={this.signup}>Sign up</button>
            </div>
            )
        }
    }