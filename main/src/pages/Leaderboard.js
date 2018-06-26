import React,{ Component } from 'react';
import Nav from '../components/Nav';
import { connect } from 'react-redux';
import sortBy from 'underscore'

class Leaderboard extends Component {
    constructor(props){
        super(props);
        console.log(props)
    }
    render () {
        return (
            <div>
                <Nav/>
                <h1>Leaderboard page</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Questions Asked</th>
                            <th>Questions Answered</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.modifiedUsers.map((user)=>(
                            <tr key={Math.random()}>
                                <td>{user.name}</td>
                                <td>{user.totalQuestions}</td>
                                <td>{user.totalAnswers}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                    
                    
                </table>
            </div>
        )
    }
}

function mapStateToProps({authedUser,users,polls}) {
    let modifiedUsers = Object.keys(users).map((user)=>{
        //console.log(user);
        let{name,avatarUrl,answers,questions}=users[user]
        const totalAnswers = Object.keys(answers).length;
        const totalQuestions = questions.length;
        const sum = totalAnswers+totalQuestions;

        return {name,avatarUrl,sum,totalAnswers,totalQuestions}
        
    })
    function compareValues(key, order='asc') {
        return function(a, b) {
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0; 
            }

            const varA = (typeof a[key] === 'string') ? 
            a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ? 
            b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order == 'desc') ? (comparison * -1) : comparison
            );
        };
    }
    modifiedUsers = modifiedUsers.sort(compareValues('sum', 'desc'));
    return {
        authedUser,
        users,
        modifiedUsers
    }
}

export default connect(mapStateToProps)(Leaderboard);