import initialState from './initialState.js'
import { ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL, CLEAN_CART } from '../actions/constants.js'
import * as shoppinCartState from "../lib/shoppingCartStorage.js"

export default function shoppingCart(state = initialState, action) {
    let newState, newPizza;
    let baseAndPizzaExists, newShoppingCart, indexOfPizza;

    switch (action.type) {
        case ADD_TO_CART:
            baseAndPizzaExists = (state.shoppingCartPizzas.findIndex(pizza =>
                action.pizza.id === pizza.id &&
                pizza.baseSel === action.base.baseType));

            if (baseAndPizzaExists !== -1) {
                newShoppingCart = [].concat(state.shoppingCartPizzas);
                newShoppingCart[baseAndPizzaExists].count++;
                newState = { ...state, shoppingCartPizzas: newShoppingCart };
            } else {
                newPizza = {
                    ...action.pizza, count: 1,
                    baseSel: action.base.baseType
                };
                newState = {
                    ...state, shoppingCartPizzas:
                        state.shoppingCartPizzas.concat(newPizza)
                }
            }
            shoppinCartState.modifyShoppingCart(newState.shoppingCartPizzas);
            return newState;

        case REMOVE_FROM_CART:
            let newTotal = 0;
            newShoppingCart = [].concat(state.shoppingCartPizzas);
            indexOfPizza = (state.shoppingCartPizzas.findIndex(pizza =>
                action.pizza.id === pizza.id &&
                pizza.baseSel === action.pizza.baseSel));

            if (state.shoppingCartPizzas[indexOfPizza].count === 1) {
                newShoppingCart.splice(indexOfPizza, 1);
            } else {
                newShoppingCart[indexOfPizza].count--;
            }

            for (let i = 0; i < newShoppingCart.length; i++) {
                newTotal += parseInt(newShoppingCart[i].price) *
                    parseInt(newShoppingCart[i].count);
            }


            newState = {
                ...state, shoppingCartPizzas: newShoppingCart,
                orderTotal: newTotal
            };
            shoppinCartState.modifyShoppingCart(newShoppingCart);
            return newState;

        case CALCULATE_TOTAL:
            let total = 0;

            for (let i = 0; i < action.shoppingCartPizzas.length; i++) {
                total += parseInt(action.shoppingCartPizzas[i].price) *
                    parseInt(action.shoppingCartPizzas[i].count);
            }
            newState = { ...state, orderTotal: total }
            return newState;


        case CLEAN_CART:
            let cleanBase = {
                baseSelected: false,
                baseType: "",
                id: ""
            }
            let newCart = []
            newState = { ...state, shoppingCartPizzas: newCart,
                currentBase: cleanBase, orderTotal: 0}
            return newState;
        default:
            return state;
    }
}
