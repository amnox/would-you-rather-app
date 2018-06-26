import { RECEIVE_POLLS, ADD_POLL,UPDATE_POLL_VOTE } from '../actions/polls'

export default function polls (state = {}, action) {
    switch(action.type){
        case RECEIVE_POLLS:
            return {
                ...state,
                ...action.polls
            }
        case ADD_POLL:
            return {
                ...state,
                [action.poll.id]: action.poll
            }
        case UPDATE_POLL_VOTE:

            return {
                ...state,
                [action.poll]:{
                    ...state[action.poll],
                    [action.answer]:{
                        ...state[action.poll][action.answer],
                        votes:state[action.poll][action.answer].votes.concat([action.user]),

                    }
                }
            }
        default :
            return state
    }
}