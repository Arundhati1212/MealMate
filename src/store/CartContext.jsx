import { createContext, useReducer } from "react";
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // state.items.push(action.item);
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItems = [...state.items];
    if (existingItemIndex > -1) {
      const existingCartItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingItemIndex];
    let updatedItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
}

export function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  const cartContext = {
    items: cartState.items,
    addItem,
    removeItem,
    clearCart,
  };

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(item) {
    dispatchCartAction({ type: "REMOVE_ITEM", item });
  }
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
