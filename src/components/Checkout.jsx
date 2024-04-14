import { useContext, useState } from "react";
import Modal from "./ui/Modal";
import CartContext from "../store/CartContext";
import ModalContext from "../store/ModalContext";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { placeOrder } from "./fetchCalls";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const modalCtx = useContext(ModalContext);
  const [isStored, setIsStored] = useState(false);

  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let checkoutData = Object.fromEntries(formData.entries());
    console.log(checkoutData);

    const orderData = {
      order: {
        items: cartCtx.items,
        customer: checkoutData,
      },
    };

    //Send order to backend
    try {
      const result = await placeOrder(orderData);
      console.log(result);
      if (result === "Order created!") {
        //close modal
        modalCtx.closeCheckout();
        // clear cart
        cartCtx.clearCart();

        setIsStored(true);
      }
    } catch (e) {
      console.log(e);
      setIsStored(false);
    }
    event.target.reset();
  }
  return (
    <>
      <Modal open={isStored} closefn={() => setIsStored(false)}>
        <h2> Order Placed!! </h2>
        <p> Enjoy your meal 😋</p>
        <p className="modal-actions">
          <Button onClick={() => setIsStored(false)} textonly>
            Close
          </Button>
        </p>
      </Modal>
      <Modal
        open={modalCtx.progress === "checkout"}
        closefn={modalCtx.closeCheckout}
      >
        <form onSubmit={handleSubmit}>
          <h2>Checkout</h2>
          <p>Total Amount: ${cartTotal}</p>
          <Input label="Full Name" type="text" id="name" />
          <Input label="Email" type="email" id="email" />
          <Input label="Street" type="text" id="street" />
          <div className="control-row">
            <Input label="Postal Code" type="text" id="postal-code" />
            <Input label="City" type="text" id="city" />
          </div>
          <p className="modal-actions">
            <Button type="button" onClick={modalCtx.closeCheckout} textonly>
              Close
            </Button>
            <Button>Submit Order</Button>
          </p>
        </form>
      </Modal>
    </>
  );
}
