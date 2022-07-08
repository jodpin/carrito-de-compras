import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import Cart from "./Cart";
import { useEffect } from "react";
import logo from "../imagenes/logo.jpg";
import "typeface-quicksand";
import Footer from "./Footer";
import ModalSign from "./ModalSign";
import CarouselNew from "./CarouselNew";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import ProductList from "./ProductList";
import Cookies from "universal-cookie";
import SignInForm from "./SignInForm";

const initialProducts = [
  {
    id: 1,
    name: "producto 1",
    price: 150,
    img: "https://placeimg.com/150/200/animals",
  },
  {
    name: "producto 2",
    id: 2,
    price: 200,
    img: "https://placeimg.com/150/200/arch",
  },
  {
    name: "producto 3",
    id: 3,
    price: 300,
    img: "https://placeimg.com/150/200/nature",
  },
  {
    name: "producto 4",
    id: 4,
    price: 400,
    img: "https://placeimg.com/150/200/people",
  },
  {
    name: "producto 5",
    id: 5,
    price: 500,
    img: "https://placeimg.com/150/200/tech",
  },
  {
    name: "producto 6",
    id: 6,
    price: 600,
    img: "https://placeimg.com/150/200/tech/grayscale",
  },
  {
    name: "producto 7",
    id: 7,
    price: 700,
    img: "https://placeimg.com/150/200/tech/sepia",
  },
  {
    name: "producto 8",
    id: 8,
    price: 800,
    img: "https://placeimg.com/150/200/animals",
  },
  {
    name: "producto 9",
    id: 9,
    price: 900,
    img: "https://placeimg.com/150/200/arch",
  },
];

const cookies = new Cookies();

const CompraYa = () => {
  const [db, setDb] = useState(initialProducts);
  const [cartProducts, setCartProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isVisibleLogin, setIsVisibleLogin] = useState(false);
  const [isVisibleSignIn, setIsVisibleSignIn] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calcTotal();
  }, [cartProducts]);

  function toggleFormSignIn() {
    setIsVisibleSignIn(!isVisibleSignIn);
  }

  function showCart() {
    setIsVisible(!isVisible);
  }

  function showLogin() {
    setIsVisibleLogin(!isVisibleLogin);
  }

  function calcTotal() {
    let total = 0;
    cartProducts.forEach((el) => (total = total + el.price * el.quantity));
    setTotal(total);
  }

  const addToCart = (id) => {
    //con el id buscamos el producto en la base de datos
    let newProduct = db.find((el) => el.id === id);
    console.log(newProduct);
    //luego de encontrar dicho producto, validamos si este se encuentra en el carro de compras
    let productInCart = cartProducts.find(
      (product) => product.id === newProduct.id
    );

    //si el elemento ya esta en el carro sumamos uno en su cantidad, de lo contrario lo agregamos
    productInCart
      ? setCartProducts(
          cartProducts.map((el) =>
            el.id === newProduct.id ? { ...el, quantity: el.quantity + 1 } : el
          )
        )
      : setCartProducts([...cartProducts, { ...newProduct, quantity: 1 }]);
  };

  const deleteProduct = (id, deleteAll = false) => {
    if (!deleteAll) {
      //buscamos el elemento en el arreglo del carrito de compras
      let newProductCart = cartProducts.find((el) => el.id === id);

      let newArray = [];

      //evaluamos la cantidad del producto si solo tiene 1 unidad lo quitamos del carrito
      //si tiene mas disminuimos en 1 la unidad
      if (newProductCart.quantity > 1) {
        newArray = cartProducts.map((el) =>
          el.id === newProductCart.id
            ? { ...el, quantity: el.quantity - 1 }
            : el
        );
      } else {
        newArray = cartProducts.filter((el) => el.id !== newProductCart.id);
      }
      console.log(newArray);
      setCartProducts(newArray);
    } else {
      let newProductCart = cartProducts.find((el) => el.id === id);
      setCartProducts(cartProducts.filter((el) => el.id !== newProductCart.id));
    }
  };

  const logOut = () => {
    cookies.remove("id");
    cookies.remove("nombre");
    setIsAuth(false);
  };

  const addOneProduct = (id) => {
    let newProductCart = cartProducts.find((el) => el.id === id);

    let newArray = cartProducts.map((el) =>
      el.id === newProductCart.id
        ? { ...newProductCart, quantity: newProductCart.quantity + 1 }
        : el
    );

    console.log(newArray);

    setCartProducts(newArray);
  };

  return (
    <div>
      <header className="header">
        <div className="container-logo">
          <img src={logo} alt="" className="logo" />
          <h1>
            <b>CompraYa</b>
          </h1>
        </div>

        <div className="container-icon-cart">
          {isAuth && <button onClick={logOut}>Cerrar sesion</button>}
          {!isAuth && (
            <span onClick={toggleFormSignIn}>
              <Link className="link" to="/registro">
                Registrarse
              </Link>
            </span>
          )}
          {!isAuth && <button onClick={showLogin}>Iniciar sesion</button>}
          <BsCart2 className="icon" onClick={showCart}></BsCart2>
        </div>
      </header>

      <div className="img-container">
        <h1>Todo lo que necesitas al alcance de tu mano</h1>
      </div>

      <Routes>
        <Route
          path="/"
          element={!isAuth ? <CarouselNew /> : <Navigate to="/hacer-pedido" />}
        />
        <Route
          path="/registro"
          element={
            !isVisibleSignIn ? (
              <SignInForm toggleFormSignIn={toggleFormSignIn} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/hacer-pedido"
          element={
            isAuth ? (
              <ProductList db={db} addToCart={addToCart} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>

      <Cart
        cartProducts={cartProducts}
        isVisible={isVisible}
        deleteProduct={deleteProduct}
        addOneProduct={addOneProduct}
        total={total}
      />

      <Footer />
      <ModalSign
        isVisibleLogin={isVisibleLogin}
        setIsVisibleLogin={setIsVisibleLogin}
        showLogin={showLogin}
        setIsAuth={setIsAuth}
      />
    </div>
  );
};

export default CompraYa;
