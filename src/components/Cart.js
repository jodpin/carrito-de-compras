import React from "react";
import ItemProductCart from "./ItemProductCart";

const Cart = ({ cartProducts, isVisible, addOneProduct, deleteProduct, total }) => {
  return (
    <div className={`cart ${!isVisible && "no-visible"}`}>
      <table>
        <thead>
          <tr>
            <th colSpan="3"> Tus compras </th>
            <th colSpan="2"> {`Total: ${total}`} </th>
          </tr>
          <tr>
            <th>imagen</th>
            <th>nombre</th>
            <th>cantidad</th>
            <th>precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.length > 0 ? (
            cartProducts.map((product) => (
              <ItemProductCart
                key={product.id}
                id={product.id}
                product={product}
                deleteProduct={deleteProduct}
                addOneProduct={addOneProduct}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                no has agregado nada aun
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
