import React from "react";
// BOTON CON BOOTSTRAP

const ItemProduct = ({ product, addToCart }) => {
  const { name, price, img, id } = product;

  return (
    <div className="item-product">
      <h3>{name}</h3>
      <img src={img} alt="imagen" />
      <h4>{price}</h4>
      <button className="add-btn btn btn-secondary" onClick={() => addToCart(id)}>
        Agregar al carrito
      </button>
      {/* al pasarle por parametro el id en el hijo, lo enviamos al padre donde esta definida la funcion*/}
    </div>
  );
};

export default ItemProduct;
