import { createContext, useState } from "react";

const ModalContext = createContext({
  progress: "",
  openCart: () => {},
  closeCart: () => {},
  openCheckout: () => {},
  closeCheckout: () => {},
});

export function ModalContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function openCart() {
    setUserProgress("cart");
  }

  function closeCart() {
    setUserProgress("");
  }

  function openCheckout() {
    setUserProgress("checkout");
  }

  function closeCheckout() {
    setUserProgress("");
  }
  const modalContext = {
    progress: userProgress,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
