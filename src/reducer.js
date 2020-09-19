export const initialState = {
  authorized: false,
  user: null,
  cart: [],
  accessableRoutes: null,
  role: null,
};

//Create cart total selector
export const getCartTotal = (cart) => {
  const total = cart.reduce((total, item) => {
    return (total += item.quantity * item.price);
  }, 0);
  return total;
};

const reducer = (state, action) => {
  //Help with debugging
  console.log(action);
  switch (action.type) {
    case "SET_AUTHORIZED":
      return {
        ...state,
        authorized: action.authorized,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex(
        (item) =>
          item.skuId === action.skuId && item.quantity === action.quantity
      );
      let newCart = [...state.cart];
      console.log("index is >>>>>", index);
      //   console.log(index);
      if (index >= 0) {
        newCart.splice(index, 1);
      }
      return {
        ...state,
        cart: newCart,
      };
    case "SET_ACCESSABLE_ROUTES":
      return {
        ...state,
        accessableRoutes: action.accessableRoutes,
      };
    case "SET_ROLE":
      return {
        ...state,
        userRole: action.userRole,
      };
    case "SET_LISTINGS":
      return {
        ...state,
        listings: action.listings,
      };
    default:
      return state;
  }
};

export default reducer;
