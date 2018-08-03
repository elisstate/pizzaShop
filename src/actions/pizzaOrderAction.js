import * as ACTIONS from './constants.js';


export function removeFromCart(pizza) {
    return {
        type: ACTIONS.REMOVE_FROM_CART,
        pizza: pizza
    }
}

export function calculateTotal(shoppingCart) {
    return {
        type: ACTIONS.CALCULATE_TOTAL,
        shoppingCartPizzas: shoppingCart
    }
}


export function cleanCart() {
    return {
        type: ACTIONS.CLEAN_CART
    }
}