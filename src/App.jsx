import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Checkout from "./components/checkout";
import { CartContextProvider } from "./store/CartContext";
import { ModalContextProvider } from "./store/ModalContext";

function App() {
  return (
    <CartContextProvider>
      <ModalContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </ModalContextProvider>
    </CartContextProvider>
  );
}

export default App;
