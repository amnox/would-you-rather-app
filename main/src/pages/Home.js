import React,{ Component } from 'react';
import Nav from '../components/Nav';
import { connect } from 'react-redux';
import '../style/home.css';
import classNames from 'classnames';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

class Home extends Component {
    constructor(props){
        super(props);
        this.changeQuestions= this.changeQuestions.bind(this);
        this.openPoll= this.openPoll.bind(this);
        this.state = {
            selected: 'answered'
        }
        //console.log(props)
    }

    openPoll(pollId){
        this.props.history.push('/poll/'+pollId)
    }

    changeQuestions(){
        this.setState((previousState)=>{
            return previousState.selected==='unanswered'
                ?{selected:'answered'}
                :{selected:'unanswered'}
        })
    }

    render () {
        let toggleBtnClass = {
            "knob":true,
            "left":this.state.selected==='answered',
            "right":this.state.selected==='unanswered'
        }
        let questionList = this.props[this.state.selected]
        //console.log(questionList)
        return (

            <div id="home">
                <Nav/>
                <h1>Home</h1>
                <div className="toggle">
                    
                    <div className="switch" onClick={()=>this.changeQuestions()}>
                        <div className={classNames.bind()(toggleBtnClass)}></div>
                    </div>
                    <p>Toggle Questions:  </p>
                    
                </div>
                <div className="now-showing">{this.state.selected} Polls</div>
                <div className="questions">
                    {
                        questionList.map((question)=> 
                            <div key={Math.random()} className="question" onClick={()=>this.openPoll(question.id)}>
                                <div className="option-one">{question.optionOne.text}</div>
                                <div className="or">OR</div>
                                <div className="option-two">{question.optionTwo.text}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser,users,polls}) {
    
    let {answers, questions} = users[authedUser];
    
    let userAnswered =[], userUnanswered=[];
    Object.keys(answers).map((ans)=>{userAnswered.push(polls[ans])})
    Object.keys(polls).map((ans)=>{
        if(!Object.keys(answers).includes(ans)){
            userUnanswered.push(polls[ans])
        }
    })
    return {
        authedUser,
        unanswered: userUnanswered,
        answered: userAnswered
    }
}

export default withRouter(connect(mapStateToProps)(Home));