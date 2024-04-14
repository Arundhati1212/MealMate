import Button from "./ui/Button";
import CartContext from "../store/CartContext";
import { useContext } from "react";

export default function Meal({ meal }) {
  const cartContext = useContext(CartContext);
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt="" />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">${meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>

        <p className="meal-item-actions">
          <Button onClick={() => cartContext.addItem(meal)}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
