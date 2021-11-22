import React from "react";
import "./CheckoutProduct.css";

function CheckoutProdut({ id, title, img, rating, price }) {
  return (
    <div className="checkoutProduct" key={id}>
      <img className="checkoutProduct__image" src={img} alt={title} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small style={{ fontSize: "16px", marginRight: "4px" }}>
            &#8377;
          </small>
          <strong
            style={{
              fontSize: "20px",
              fontFamily: "Playfair Display",
            }}
          >
            {parseFloat(price).toFixed(2)}
          </strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => {
              return <p>⭐</p>;
            })}
        </div>
      </div>
    </div>
  );
}

export default CheckoutProdut;
