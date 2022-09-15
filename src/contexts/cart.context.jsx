import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
  //const [numberOfItems, setNumberOfItems] = useState(0);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const value = { setIsCartOpen, isCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
