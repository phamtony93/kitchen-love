export const initialState = {
    authorized: false,
    user: null,
    cart: null,
    accessableRoutes: null,
    role: null,
}

const reducer = (state, action) => {
    //Help with debugging
    console.log(action)
    switch(action.type) {
        case 'SET_AUTHORIZED':
            return {
                ...state,
                authorized: action.authorized
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_CART':
            return {
                ...state,
                cart: action.cart
            }
        case 'SET_ACCESSABLE_ROUTES':
            return {
                ...state,
                accessableRoutes: action.accessableRoutes
            }
        case 'SET_ROLE':
            return {
                ...state,
                role: action.role
            }
        default:
            return state
    }
}

export default reducer