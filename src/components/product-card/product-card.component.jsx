import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItem /* setItemsCount */ } = useContext(CartContext);

  const addProductToCart = () => {
    addItem(product);
    //setItemsCount((prev) => prev + 1);
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        onClick={addProductToCart}
        buttonType={BUTTON_TYPE_CLASSES.inverted}
      >
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
