import * as ACTIONS from './constants.js';


export function login(username, password) {
    return {
        type: ACTIONS.LOGIN,
        username:  username,
        password: password
    }
}


export function logout(username) {
    return {
        type: ACTIONS.LOGOUT,
        username:  username
    }
}