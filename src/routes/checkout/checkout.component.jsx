import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.jsx";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles.jsx";

const Checkout = () => {
  const { cartItems, total } = useContext(CartContext);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>Product</HeaderBlock>
        <HeaderBlock className="header-block">Description</HeaderBlock>
        <HeaderBlock className="header-block">Quantity</HeaderBlock>
        <HeaderBlock className="header-block">Price</HeaderBlock>
        <HeaderBlock className="header-block">Remove</HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <Total>Total : {total}$</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
