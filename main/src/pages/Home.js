import React,{ Component } from 'react';
import Nav from '../components/Nav';
import { connect } from 'react-redux';

class Home extends Component {
    render () {
        return (
            <div>
                <Nav/>
                <h1>{this.props.authedUser}</h1>
            </div>
        )
    }
}

function mapStateToProps({authedUser,users,polls}) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(Home);