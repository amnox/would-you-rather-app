import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const SAVE_POLL_ANSWER = 'SET_POLL_ANSWER'
export const ADD_POLL = 'ADD_POLL'

function addPoll (poll) {
    return {
        type: ADD_POLL,
        poll
    }
}

export function handleAddPoll (poll){
    return (dispatch,getState) => {
        const { authedUser } = getState();
        return saveQuestion({
            poll,
            author: authedUser
        }).then((poll) => dispatch(addPoll))
    }
}

function savePollAnswer({id,authedUser,answer}){
    return {
        type: SAVE_POLL_ANSWER,
        id,
        authedUser,
        answer
    }
}

export function handleSavePollAnswer ({id,authedUser,answer},prevAnswer) {
    return (dispatch) => {
        return saveQuestionAnswer({id,authedUser,answer})
            .then(() => dispatch(savePollAnswer({id,authedUser,answer})))
            .catch((e) => {
                console.warn('error in handling answer', e);
                dispatch(savePollAnswer({id,authedUser,prevAnswer}));
                alert('Error Saving Answer')
            })
    }
}

export function receivePolls(polls) {
    return {
        type: RECEIVE_POLLS,
        polls,
    }
}