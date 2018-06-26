import { SAVE_USER_ANSWER, RECEIVE_USERS } from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
        case SAVE_USER_ANSWER:
            return {
                ...state,
                [action.authedUser]:{
                    ...state[action.authedUser],
                    answers:{
                        ...state[action.authedUser].answers,
                        [action.id]:action.answer
                    }
                }
            }
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        default :
            return state
    }
}