import initialState from './initialState.js'
import {SELECT_BASE} from '../actions/constants.js'

export default function pizzaComp(state = initialState.currentBase, action) {
    let newState;

    switch(action.type) {
        case SELECT_BASE:
            newState = {...state, 'baseSelected': true, 'baseType': action.baseType,
            'id': action.basePizzaId}
          
            return newState;
        default:
            return state;
    }
}
