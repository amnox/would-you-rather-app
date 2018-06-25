import {
    _getQuestions,
    _getUsers,
    _saveQuestion,
    _saveQuestionAnswer,
    _getAuthedUser,
    _removeAuthedUser,
    _saveAuthedUser
} from './_DATA.js'

export function getInitialData () {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users,polls])=> ({
        users,
        polls,
    }))
}

export function saveQuestion(info){
    return _saveQuestion(info)
}

export function saveQuestionAnswer(info){
    return _saveQuestionAnswer(info)
}

export function getAuthedUser(){
    return _getAuthedUser()
}

export function deleteAuthedUser(){
    return _removeAuthedUser()
}

export function saveAuthedUser(user){
    console.log(user)
    return _saveAuthedUser(user)
}