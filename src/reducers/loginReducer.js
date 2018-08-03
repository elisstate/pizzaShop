import initialState from './initialState.js'
import { LOGIN, LOGOUT } from '../actions/constants.js'
import * as loginState from "../lib/loginState.js"


export default function logHandle(state = initialState, action) {
    let newState, cleanBase;

    switch (action.type) {
        case LOGIN:
            loginState.setLogin(action.username);
            newState = { ...state, loggedIn: true, username: action.username }

            return newState;

        case LOGOUT:
            loginState.setLogin("")
            newState = {...state, loggedIn: false, username: ""}
           
            return newState;
            
        default:
            return state;
    }
}