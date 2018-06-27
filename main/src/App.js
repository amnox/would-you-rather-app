import React from 'react';
import {USER_NOT_SET} from './utils/_DATA'
import { handleInitialData } from './actions/shared';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import { connect } from 'react-redux';
import Login from './pages/Login'
import Logout from './pages/Logout'
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'
import SinglePoll from './pages/SinglePoll'
import AddPoll from './pages/AddPoll'
import LoadingBar from 'react-redux-loading';
import { handleRemoveAuthedUser } from './actions/authedUser';

class App extends React.Component {

    constructor(props){
        super(props);
        this.reloadListener();
        //console.log(props);
    }
    reloadListener() {
        if (window.performance) {
          if (performance.navigation.type == 1) {
            this.props.dispatch(handleRemoveAuthedUser());
          }
        }
      }

    componentDidMount () {
        this.props.dispatch(handleInitialData());
    }
    render () {
        return (
            <Router>
                <div>
                <LoadingBar/>
                
                {
                    this.props.loading===true
                        ?<h1>Loading</h1>
                        :<div>
                            <Route path="/login" exact component={Login} />
                            <Route path="/logout" exact component={Logout} />
                            <PrivateRoute path="/" exact login = {this.props.login} component={Home} />
                            <PrivateRoute path="/leaderboard" exact login = {this.props.login} component={Leaderboard} />
                            <PrivateRoute path="/new_poll" exact login = {this.props.login} component={AddPoll} />
                            <PrivateRoute path="/questions/:id" exact login = {this.props.login} component={SinglePoll} />
                        </div>
                }
                </div>
            </Router>
            
        )
    }
}

const PrivateRoute = ({ component: Component,login, ...rest }) => {
    //console.log(login)
    return <Route
        {...rest}
        render={props =>
        login ? (
        <Component {...props} />
        ) : (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: props.location }
                }}
            />
            )
        }
    />
}



function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function mapStateToProps({authedUser,users,polls}) {
    //console.log(isEmpty(authedUser))
    return {
      login: authedUser !== USER_NOT_SET,
      loading: isEmpty(users)||isEmpty(polls)||isEmpty(authedUser)
    }
}

export default connect(mapStateToProps)(App);