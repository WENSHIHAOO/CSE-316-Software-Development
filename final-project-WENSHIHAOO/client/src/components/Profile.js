import React from 'react';
import Row1 from './Row1';
import AnswerPage from './AnswerPage';
import TagsPage from './TagsPage';
//____________________Answers Page_____________________//
export default class Profile extends React.Component{
    constructor(props){
      super(props);
        this.Questions = this.Questions.bind(this);
        this.Tags = this.Tags.bind(this);
        this.Answers = this.Answers.bind(this);
    }

    Questions(){
        this.props.handleQuestions();
    }

    Tags(){
        this.props.handleTags();
    }

    Answers(){
        this.props.handleAnswers();
    }

    render(){
        let userDate = Date.parse(this.props.state.user_date_time);
        let nowDate = Date.parse(new Date());

        let days = (nowDate-userDate)/(24*60*60*1000);
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td><h1>{this.props.state.username}</h1></td>
                            <td><h4>Member for {Math.round(days)} days</h4></td>
                            <td><h4>Reputation: {this.props.state.reputation}</h4></td>
                        </tr>
                        <tr>
                            <td><button className='pro' onClick={this.Questions}>Questions</button></td>
                            <td><button className='pro' onClick={this.Answers}>Answers</button></td>
                            <td><button className='pro' onClick={this.Tags}>Tags</button></td>
                        </tr>
                    </thead>
                </table>
                <hr id="proHr"></hr>
                {this.props.state.ProfileRow1?(this.props.state.profile.qus.length!==0)?<Row1
                handleDisplayChange={this.props.handleDisplayChange}
                handleAnswerQuestion={this.props.handleAnswerQuestion}
                handleAskChange={this.props.handleAskChange}
                handleAlertChange = {this.props.handleAlertChange}
                handleQuestionEditPage = {this.props.handleQuestionEditPage}
                handleQuestionDelete = {this.props.handleQuestionDelete}
                state = {this.props.state}/>:<h1 className='empty'>You have not asked any questions.</h1>
                :''}
                {this.props.state.ProfileAnswerPage?(this.props.state.profile.ans.length!==1)?<AnswerPage
                handleAnswerText={this.props.handleAnswerText}
                handleAskChange={this.props.handleAskChange}
                handle5Answers={this.props.handle5Answers}
                handleVote={this.props.handleVote}
                handleAlertChange = {this.props.handleAlertChange}
                handleComment = {this.props.handleComment}
                handleAnswerEditPage = {this.props.handleAnswerEditPage}
                handleAnswerDelete = {this.props.handleAnswerDelete}
                state = {this.props.state}/>:<h1 className='empty'>You have not answered any questions.</h1>
                :''}
                {this.props.state.ProfileTagsPage?(this.props.state.profile.tag.length!==0)?<TagsPage
                handleDisplayChange={this.props.handleDisplayChange}
                handleAskChange={this.props.handleAskChange}
                handleSearchChange={this.props.handleSearchChange}
                handleAlertChange = {this.props.handleAlertChange}
                handleTagEditPage = {this.props.handleTagEditPage}
                handleTagDelete = {this.props.handleTagDelete}
                handleTagEdit = {this.props.handleTagEdit}
                state = {this.props.state}/>:<h1 className='empty'>You have not participated in any tags.</h1>
                :''}
            </div>
        );
    }
}