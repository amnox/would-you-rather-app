import { getInitialData } from "../utils/api";
import { setAuthedUser } from './authedUser'
import { receiveUsers } from './users'
import { receivePolls } from './polls'

export function handleInitialData () {
    return (dispatch) => {
        return getInitialData()
            .then(({users,polls}) => {
                dispatch(setAuthedUser(null))
                dispatch(receivePolls(polls))
                dispatch(receiveUsers(users))
            })
    }
}