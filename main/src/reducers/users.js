import { SAVE_USER_ANSWER, RECEIVE_USERS } from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
        case SAVE_USER_ANSWER:
            return {
                ...state,
                [action.authedUser]:{
                    ...[action.authedUser],
                    answers:{
                        ...[action.authedUser.answers],
                        [action.id]:action.answers
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