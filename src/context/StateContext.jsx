import { createContext, useContext, useEffect, useState } from "react";

const context = createContext();

// eslint-disable-next-line react/prop-types
export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  const [showCart, setShowCart] = useState(false);

  const AddToCart = (product, color, size) => {
    const newCartItem = {
      ...product,
      selectedSize: size,
      selectedColor: color,
      quantity: 1,
    };
    product.selectedColor = color;

    const checkproduct = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.selectedColor === product.selectedColor &&
        item.selectedSize === product.selectedSize
    );

    setCartItems((curent) =>
      checkproduct
        ? curent.map((cartItem) =>
            cartItem.id === product.id &&
            cartItem.selectedColor === product.selectedColor &&
            cartItem.selectedSize === product.selectedSize
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...curent, newCartItem]
    );
  };
  //   if (checkproduct) {
  //     console.log("worked");
  //     setCartItems(
  //       cartItems.map((cartItem) =>
  //         cartItem.id === product.id &&
  //         cartItem.selectedColor === product.selectedColor
  //           ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //           : cartItems
  //       )
  //     );
  //   } else {
  //     setCartItems([...cartItems, newCartItem]);
  //   }
  // };

  const removeFromCart = (product) => {
    const checkproduct = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.selectedColor === product.selectedColor &&
        item.selectedSize === product.selectedSize
    );

    if (checkproduct.quantity === 1) {
      setCartItems(
        cartItems.filter(
          (cartItem) =>
            cartItem.id !== product.id ||
            cartItem.selectedColor !== product.selectedColor ||
            cartItem.selectedSize !== product.selectedSize
        )
      );
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === product.id &&
          cartItem.selectedColor === product.selectedColor &&
          cartItem.selectedSize === product.selectedSize
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <context.Provider
      value={{
        clearCart,
        getCartTotal,
        removeFromCart,
        cartItems,
        setCartItems,
        AddToCart,
        showCart,
        setShowCart,
      }}
    >
      {children}
    </context.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(context);
