import { useContext } from "react";
import logoUrl from "../assets/logo.jpg";
import Button from "./ui/Button";
import CartContext from "../store/CartContext";
import ModalContext from "../store/ModalContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const modalCtx = useContext(ModalContext);
  const quantity = cartCtx.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoUrl} alt="Logo" />
        <h1>MealMate</h1>
      </div>
      <nav>
        <Button textOny onClick={modalCtx.openCart}>
          Cart ({quantity})
        </Button>
      </nav>
    </header>
  );
}
