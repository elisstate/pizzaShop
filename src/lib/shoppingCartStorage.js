
export function modifyShoppingCart(shoppingCart) {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
}

export function getShoppingCart() {
    return JSON.parse(localStorage.getItem("shoppingCart"));
}