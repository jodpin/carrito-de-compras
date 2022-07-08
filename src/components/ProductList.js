import React from "react";
import ItemProduct from "./ItemProductMarket";

const ProductList = ({addToCart, db }) => {

    return(
    <div className="container-products">
    {db.map((product) => (
      <ItemProduct
        key={product.id}
        id={product.id}
        product={product}
        addToCart={addToCart}
      ></ItemProduct>
    ))}
  </div>
  )
};

export default ProductList;
