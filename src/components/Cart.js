import React from "react";
import ItemProductCart from "./ItemProductCart";

const Cart = ({
  cartProducts,
  isVisible,
  addOneProduct,
  deleteProduct,
  total,
  isAuth,
  sendOrder,
}) => {

  return (
   <div className={`cart-container ${!isVisible && "no-visible"}`}>
    <div className="cart">
      <table>
        <thead>
          <tr>
            <th colSpan="2"> {`Total: ${total}`} </th>
            {isAuth && cartProducts.length > 0 && (
              <th className="cart-send-btn" onClick={sendOrder} colSpan="2">
                {cartProducts.length > 0 ? "Enviar pedido✅" : ""}
              </th>
            )}
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
      </div>
  );
};

export default Cart;
