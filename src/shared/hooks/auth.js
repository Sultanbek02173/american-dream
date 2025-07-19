import Cookies from "js-cookie"

export const setRole = (role) => {
    Cookies.set('user_role', role, {expires: 1})
}

export const getRole = () => {
    return Cookies.get('user_role')
}

export const removeRole = () => {
    Cookies.remove('user_role')
}