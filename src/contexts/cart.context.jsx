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

const RemoveCartItem = (itemToRemove, items) => {
  // find the actual element
  let found = items.find((item) => {
    return itemToRemove.id === item.id;
  });

  // if quantity is 1 remove element
  if (found.quantity === 1) {
    return deleteItem(itemToRemove, items);
  }

  // if not decrease the quantity
  return items.map((item) =>
    item.id === itemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const deleteItem = (itemToRemove, items) => {
  return items.filter((item) => item.id !== itemToRemove.id);
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [itemsCount, setItemsCount] = useState(0);

  const [total, setTotal] = useState(0);

  const addItem = (productToAdd) => {
    setCartItems(AddProductToCartItems(productToAdd, cartItems));
  };

  const removeItem = (item) => {
    setCartItems(RemoveCartItem(item, cartItems));
  };

  const deleteCartItem = (item) => {
    setCartItems(deleteItem(item, cartItems));
  };

  useEffect(() => {
    setItemsCount(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setTotal(
      cartItems.reduce(
        (accumulator, item) => accumulator + item.quantity * item.price,
        0
      )
    );
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItem,
    itemsCount,
    setItemsCount,
    removeItem,
    deleteCartItem,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
