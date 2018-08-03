import * as shoppinCartState from "../lib/shoppingCartStorage.js"
import * as loginState from "../lib/loginState.js"

export default {
    currentBase: {
        baseSelected: false,
        baseType: "",
        id: ""
    },
    shoppingCartPizzas: shoppinCartState.getShoppingCart(),
    orderTotal: 0,
    loggedIn: loginState.getLoginStatus(),
    username: loginState.getUsername()
}