import React,{ Component } from 'react';
import Nav from '../components/Nav';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
    NavLink
} from "react-router-dom";
import classNames from 'classnames';
import '../style/singlepoll.css';
import { handleSavePollAnswer } from '../actions/users';

class SinglePoll extends Component {
    constructor(props){
        super(props)
        this.answerSubmit= this.answerSubmit.bind(this);
    }

    answerSubmit(answer){
        var pollOnPage = this.props.polls[this.props.match.params.id]
        const currentUserAnswers = this.props.users[this.props.authedUser].answers;
        let { id, author, optionOne, optionTwo, timestamp } = pollOnPage
        const hasAnswered = currentUserAnswers[id]===undefined ? false : true;
        if(hasAnswered){
            alert('dafaq?')
            return
        }
        this.props.dispatch(handleSavePollAnswer({
            id,
            authedUser: this.props.authedUser,
            answer: answer
        },null))
    }

    render () {
        var pollOnPage = this.props.polls[this.props.match.params.id]
        if (pollOnPage === undefined){
            return (
                <div>
                    <p>Poll Not found <NavLink to='/' exact activeClassName='active'>
                    >>> Go back to HomePage
                </NavLink></p>

                </div>
            )
        }

        const currentUserAnswers = this.props.users[this.props.authedUser].answers;
        let { id, author, optionOne, optionTwo, timestamp } = pollOnPage
        const hasAnswered = currentUserAnswers[id]===undefined ? false : true;
        const userAnswer = currentUserAnswers[id];
        console.log(optionOne.votes.length,optionTwo.votes.length)
        const getPollClass = (option,selected) => {
            return {
                [option]:true,
                "active":false,
                "disabled":hasAnswered,
                "selected":option==='option-one'&&userAnswer==='optionOne' || option==='option-two'&&userAnswer==='optionTwo'?true:false
            }
        }
        const percentage = (opt) => {
            if (opt === 'optionOne'){
                return (optionOne.votes.length/(optionOne.votes.length+optionTwo.votes.length))*100
            } else if(opt === 'optionTwo') {
                return (optionTwo.votes.length/(optionOne.votes.length+optionTwo.votes.length))*100
            }
            
        }
        return (
            <div id="single">
                <Nav/>
                <h1>Poll Page</h1>
                <div className="user-selection">{
                    hasAnswered
                        ? <p>Your Answer is: <b>{pollOnPage[userAnswer].text}</b></p>
                        :<p>Select one of the answers</p>
                }</div>
                <div className="poll">
                    <div className={classNames(getPollClass('option-one',true))} onClick={()=>this.answerSubmit('optionOne')}>
                        <div className="option-one-text">{optionOne.text}</div>
                        {
                            hasAnswered
                                ? <div className="stats">
                                    <div className="number">Number of Votes: {optionOne.votes.length}</div>
                                    <div className="percentage">Percentage: {percentage('optionOne')}</div>
                                </div>
                                :null
                        }
                    </div>
                    <div className={classNames(getPollClass('option-two',false))} onClick={()=>this.answerSubmit('optionTwo')}>
                        <div className="option-two-text">{optionTwo.text}</div>
                        {
                            hasAnswered
                                ? <div className="stats">
                                    <div className="number">Number of Votes: {optionTwo.votes.length}</div>
                                    <div className="percentage">Percentage: {percentage('optionTwo')}</div>
                                </div>
                                :null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser,users,polls}) {
    return {
        authedUser,
        users,
        polls
    }
}

export default connect(mapStateToProps)(SinglePoll);