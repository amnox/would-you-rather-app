import React,{ Component } from 'react';
import Nav from '../components/Nav';
import { connect } from 'react-redux';
import '../style/addpoll.css'
import { handleAddPoll } from '../actions/polls';

class AddPoll extends Component {
    constructor(props){
        super(props);
        this.state = {
            optionOne:'',
            optionTwo:'',
        }
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleSubmit(){
        const optionOne = this.state.optionOne;
        const optionTwo = this.state.optionTwo;
        if(/^ *$/.test(optionOne)||/^ *$/.test(optionTwo)){
            alert('Please Check input');
            return
        }
        const pollId = Math.floor(Math.random()*10000);
        const pollAuthor = this.props.authedUser;

        const poll =  {
            id: pollId,
            author: pollAuthor,
            timestamp: Date.now(),
            optionOne: {
                votes: [],
                text: optionOne,
            },
            optionTwo: {
                votes: [],
                text: optionTwo
            }
        }
        this.props.dispatch(handleAddPoll(poll))
            .then(this.setState({optionOne:'',optionTwo:''}))
        alert('SUbmitted Successfully');
    }

    handleChange(e){
        const target = e.target;
        if (target.name==='one'){
            this.setState((prevState)=>{
                return {
                    ...prevState,
                    optionOne:target.value
                }
            })
        } else if (target.name==='two'){
            this.setState((prevState)=>{
                return {
                    ...prevState,
                    optionTwo:target.value
                }
            })
        }
    }
    render () {
        return (
            <div id="add-poll">
                <Nav/>
                <h1>Add Poll</h1>
                <div className="poll-form">
                    <div>
                        <span>Option 1</span>
                        <input name="one" type="text" value={this.state.optionOne} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <span>Option 2</span>
                        <input name="two" type="text" value={this.state.optionTwo} onChange={this.handleChange}/>
                    </div>
                    <input type="button" value="Submit" onClick={this.handleSubmit}/>
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

export default connect(mapStateToProps)(AddPoll);