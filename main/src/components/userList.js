import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserItem from './userItem';

class UserList extends Component {
    constructor(props){
        super(props);
        //console.log(props);
    }

    render () {
        const { users } = this.props;
        return (
            <div className="user-list">
            {Object.keys(users).map((user)=>(
                <UserItem key={user} id={user} setAuthedUser = {this.props.setAuthedUser} />
            ))}
            </div>
        )
    }
}

function mapStateToProps ({users}){
    return {
        users
    }
}

export default connect(mapStateToProps)(UserList);