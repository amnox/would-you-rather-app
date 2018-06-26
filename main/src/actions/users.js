import { saveQuestionAnswer } from '../utils/api'
import { updatePollVotes } from './polls'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

function savePollAnswer({id,authedUser,answer}){
    return {
        type: SAVE_USER_ANSWER,
        id,
        authedUser,
        answer
    }
}

export function handleSavePollAnswer ({id,authedUser,answer},prevAnswer) {
    return (dispatch) => {
        return saveQuestionAnswer({id,authedUser,answer})
            .then(() => {
                dispatch(savePollAnswer({id,authedUser,answer}))
                dispatch(updatePollVotes({user:authedUser,answer,poll:id}))
            })
            .catch((e) => {
                console.warn('error in handling answer', e);
                dispatch(savePollAnswer({id,authedUser,prevAnswer}));
                alert('Error Saving Answer')
            })
    }
}