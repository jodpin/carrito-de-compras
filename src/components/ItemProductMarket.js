import React from "react";
// BOTON CON BOOTSTRAP

const ItemProduct = ({ product, addToCart }) => {
  const { name, price, img, id } = product;

  return (
    <div className="item-product">
      <h3 className="item-product-name">{name}</h3>
      <img className="item-product-img" src={img} alt="imagen" />
      <h4 className="item-product-price">{price}</h4>
      <button className="item-product-btn" onClick={() => addToCart(id)}>
        Agregar al carrito
      </button>
      {/* al pasarle por parametro el id en el hijo, lo enviamos al padre donde esta definida la funcion*/}
    </div>
  );
};

export default ItemProduct;
