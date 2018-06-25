import { getInitialData } from "../utils/api";
import { handleSetAuthedUser, receiveAuthedUser, handleReceiveAuthedUser } from './authedUser'
import { receiveUsers } from './users'
import { receivePolls } from './polls'
import { showLoading, hideLoading } from 'react-redux-loading';
import { USER_NOT_SET } from '../utils/_DATA'

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users,polls}) => {
                dispatch(handleReceiveAuthedUser())
                dispatch(receivePolls(polls))
                dispatch(receiveUsers(users))
                dispatch(hideLoading())
            })
    }
}