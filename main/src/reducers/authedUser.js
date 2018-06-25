import { SET_AUTHED_USER, RECEIVE_AUTHED_USER,REMOVE_AUTHED_USER } from '../actions/authedUser'

export default function authedUser (state = {}, action) {
    switch(action.type){
        case SET_AUTHED_USER :
            return action.id
        case RECEIVE_AUTHED_USER :
            return action.id
        case REMOVE_AUTHED_USER:
            return action.id
        default :
            return state
    }
}