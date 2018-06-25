import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserItem extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }

    render () {
        const { id, name, avatarURL, answers, questions } = this.props.users[this.props.id];
        
        return (
            <div className="user-item" onClick = {()=>this.props.setAuthedUser(id)}>
                <img src={avatarURL}/>
                <p>{name}</p>
            </div>
        )
    }
}

function mapStateToProps ({users}){
    return {
        users
    }
}

export default connect(mapStateToProps)(UserItem);