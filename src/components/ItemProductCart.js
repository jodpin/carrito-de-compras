import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const ItemProductCart = ({ product, addOneProduct, deleteProduct }) => {
  const { img, name, price, quantity, id } = product;

  return (
    <tr>
      <td>
        <img
          src={img}
          alt=""
          className="item-cart"
          style={{ height: "40px", width: "40px" }}
        />
      </td>
      <td>{name}</td>
      <td>
        <button className="btn-item-cart" onClick={()=>deleteProduct(id)}>-</button>
        <button className="btn-item-cart">{quantity}</button>
        <button className="btn-item-cart" onClick={()=>addOneProduct(id)}>+</button>
      </td>
      <td>{price*quantity}</td>
      <td>
        <FaTrashAlt className="trash-icon" onClick={()=>deleteProduct(id, true)}></FaTrashAlt>
      </td>
    </tr>
  );
};

export default ItemProductCart;
