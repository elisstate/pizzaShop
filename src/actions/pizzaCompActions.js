import * as ACTIONS from './constants.js';

export function selectBase(base,id) {
    return {
        type: ACTIONS.SELECT_BASE,
        baseType: base,
        basePizzaId: id
    }
}

export function addToCart(pizza, base) {
    return {
        type: ACTIONS.ADD_TO_CART,
        pizza: pizza,
        base: base
    }

}