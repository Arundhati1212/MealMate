import { useContext } from "react";
import Modal from "./ui/Modal";
import CartContext from "../store/CartContext";
import ModalContext from "../store/ModalContext";
import Button from "./ui/Button";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const modalCtx = useContext(ModalContext);

  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <Modal
      open={modalCtx.progress === "cart"}
      className="cart"
      closefn={modalCtx.progress === "cart" ? modalCtx.closeCheckout : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li className="cart-item" key={item.id}>
            <p>
              {item.name} - {item.quantity} x {item.price}
            </p>
            <p className="cart-item-actions">
              <button onClick={() => cartCtx.removeItem(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => cartCtx.addItem(item)}>+</button>
            </p>
          </li>
        ))}
      </ul>
      <p className="cart-total">${cartTotal.toFixed(2)}</p>
      <p className="modal-actions">
        <Button textonly onClick={modalCtx.closeCart}>
          Close
        </Button>
        {cartTotal !== 0 && (
          <Button onClick={modalCtx.openCheckout}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
