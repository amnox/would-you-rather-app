import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserList from  '../components/userList';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import Nav from '../components/Nav';
import { handleRemoveAuthedUser } from '../actions/authedUser';

class Logout extends Component {

    constructor(props){
        super(props)
        this.logoutAuthedUser= this.logoutAuthedUser.bind(this);
    }

    logoutAuthedUser(){
        this.props.dispatch(handleRemoveAuthedUser());
        this.props.history.push('/')
    }

    render () {
        return (
            <div id = "logout">
                
                <h1>
                    Please click to logout
                </h1>
                <button onClick = {() => this.logoutAuthedUser()}>Logout</button>
            </div>
        )
    }
}



export default withRouter(connect()(Logout))