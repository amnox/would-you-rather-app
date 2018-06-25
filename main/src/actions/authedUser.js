import { saveAuthedUser, getAuthedUser,deleteAuthedUser } from '../utils/api';
import {USER_NOT_SET} from '../utils/_DATA'
export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const RECEIVE_AUTHED_USER = 'RECEIVE_AUTHED_USER'
export const REMOVE_AUTHED_USER = 'REMOVE_AUTHED_USER'


export function setAuthedUser (id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}

export function handleSetAuthedUser(user){
    
    return (dispatch,getState) => {
        return saveAuthedUser(user)
            .then((user) => {
                //console.log(user)
                dispatch(setAuthedUser(user))
            }
            )
    }
}

export function receiveAuthedUser (id) {
    return {
        type: RECEIVE_AUTHED_USER,
        id
    }
}

export function handleReceiveAuthedUser(user){
    
    return (dispatch,getState) => {
        return getAuthedUser()
            .then((user) => {
                //console.log(user)
                dispatch(receiveAuthedUser(user))
            }
            )
    }
}

export function removeAuthedUser () {
    return {
        type: REMOVE_AUTHED_USER,
        id:USER_NOT_SET
    }
}

export function handleRemoveAuthedUser(){
    
    return (dispatch,getState) => {
        return deleteAuthedUser()
            .then(() => {
                //console.log(user)
                dispatch(removeAuthedUser())
            })
    }
}