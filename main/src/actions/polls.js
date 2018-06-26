import { saveQuestion } from '../utils/api'

export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const ADD_POLL = 'ADD_POLL'
export const UPDATE_POLL_VOTE = 'UPDATE_POLL_VOTE'

function addPoll(poll) {
    return {
        type: ADD_POLL,
        poll
    }
}

export function handleAddPoll(poll){
    
    return (dispatch,getState) => {
        const { authedUser } = getState();
        return saveQuestion({
            ...poll,
            author: authedUser
        }).then((poll) => dispatch(addPoll(poll)))
    }
}

export function receivePolls(polls) {
    return {
        type: RECEIVE_POLLS,
        polls,
    }
}

export function updatePollVotes({poll,user,answer}){
    return {
        type: UPDATE_POLL_VOTE,
        user,
        answer,
        poll
    }
}