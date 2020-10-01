export const initialState = {
  authorized: false,
  user: null,
  cart: [
    {
      item: "Iberria Tacos",
      price: 12.0,
      description: "tasty tacos",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/kitchen-love-37aba.appspot.com/o/Tacos-El-Patron-quesabirria-e1575675759948.jpg?alt=media&token=fd28ae84-ecf5-4485-a76f-3da280dae362",
      quantity: 2,
    },
  ],
  accessableRoutes: null,
  role: null,
  search: "",
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
  // console.log(action);
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
      if (index >= 0) {
        newCart.splice(index, 1);
      }
      return {
        ...state,
        cart: newCart,
      };
    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
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
    case "SET_SEARCH":
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
};

export default reducer;
