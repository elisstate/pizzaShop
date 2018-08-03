
export function setLogin(username) {
    let newState = !JSON.parse(localStorage.getItem("isLogged"))
    localStorage.setItem("isLogged", JSON.stringify(newState))

    localStorage.setItem("shoppingCart", JSON.stringify([]))
    if (newState === false)
        localStorage.setItem("username", JSON.stringify(""))
    else
        localStorage.setItem("username", JSON.stringify(username))
}

export function getUsername() {
    return JSON.parse(localStorage.getItem("username"))
}

export function getLoginStatus() {
    return JSON.parse(localStorage.getItem("isLogged"))
}

