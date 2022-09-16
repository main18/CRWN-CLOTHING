import { createContext, useEffect, useState } from "react";

const AddProductToCartItems = (itemToAdd, items) => {
  // find the product in the cartItems
  let found = items.find((item) => {
    return itemToAdd.id === item.id;
  });

  // if found increase quantity by 1
  if (found) {
    return items.map((item) =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  // return cartItems array
  return [...items, { ...itemToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItem: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [itemsCount, setItemsCount] = useState(0);

  const AddItem = (productToAdd) => {
    setCartItems(AddProductToCartItems(productToAdd, cartItems));
  };

  useEffect(() => {
    setItemsCount(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    AddItem,
    itemsCount,
    setItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
