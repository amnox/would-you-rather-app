import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/login.css';
import UserList from  '../components/userList';
import { USER_NOT_SET } from '../utils/_DATA'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import { handleSetAuthedUser } from '../actions/authedUser';

class Login extends Component {

    constructor(props){
        super(props)
        this.setAuthedUser= this.setAuthedUser.bind(this);

    }

    setAuthedUser(id){
        this.props.dispatch(handleSetAuthedUser(id));
        this.props.history.push('/')
    }

    render () {

        return (
            
            <div id = "login">

                <h1>
                    Please Login to Continue
                </h1>
                <UserList setAuthedUser = {this.setAuthedUser}/>
            </div>
        )
    }
}

function mapStateToProps({authedUser,users,polls}) {

    return {
        authedUser,
    }
}

export default withRouter(connect(mapStateToProps)(Login));