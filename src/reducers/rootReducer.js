import { combineReducers } from 'redux';
import pizzaComp from './pizzaCompReducer.js'
import shoppingCart from './shoppingCartReducer.js'
import logHandle from './loginReducer.js';


const rootReducer = combineReducers({
    pizzaComp,
    shoppingCart,
    logHandle
});

export default rootReducer;