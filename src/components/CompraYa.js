import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import Cart from "./Cart";
import { useEffect } from "react";
import logo from "../imagenes/logo.jpg";
import "typeface-quicksand";
import Footer from "./Footer";
import Login from "./Login";
import CarouselNew from "./CarouselNew";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import SignInForm from "./Register";
import supabase, { takeInfoToSendOrder } from "../supabase/supabase";
import jabondetergente from "../imagenes/jabondetergente.jpg";
import pechu from "../imagenes/pechu.jpg";
import carne from "../imagenes/carne.jpg";
import cebolla from "../imagenes/cebolla.jpg";
import habichuela from "../imagenes/habichuela.jpg";
import huevos from "../imagenes/huevos.jpg";
import naranjas from "../imagenes/naranjas.jpeg";
import papa from "../imagenes/papa.jpg";
import tomate from "../imagenes/tomate.jpg";
import clorox from "../imagenes/clorox.jpg";
import atun from "../imagenes/atun.jpg";
import Salchicha from "../imagenes/Salchicha.png";

const initialProducts = [
  {
    id: 1,
    name: "huevo - un.",
    price: 600,
    img: huevos,
  },
  {
    name: "tomate - kilo",
    id: 2,
    price: 200,
    img: tomate,
  },
  {
    name: "cebolla - kilo",
    id: 3,
    price: 300,
    img: cebolla,
  },
  {
    name: "papa - kilo",
    id: 4,
    price: 400,
    img: papa,
  },
  {
    name: "naranjas - kilo",
    id: 5,
    price: 3500,
    img: naranjas,
  },
  {
    name: "carne - libra",
    id: 6,
    price: 17000,
    img: carne,
  },
  {
    name: "pechuga - libra",
    id: 7,
    price: 5900,
    img: pechu,
  },
  {
    name: "habichuela - libra",
    id: 8,
    price: 700,
    img: habichuela,
  },
  {
    name: "lata de atun",
    id: 9,
    price: 4700,
    img: atun,
  },
  {
    name: "paquete de salchichas",
    id: 10,
    price: 6100,
    img: Salchicha,
  },
  {
    name: "jabon en polvo 500gr",
    id: 11,
    price: 4000,
    img: jabondetergente,
  },
  ,
  {
    name: "clorox un. x 1000ml",
    id: 12,
    price: 4500,
    img: clorox,
  },
];

const CompraYa = () => {
  const [db] = useState(initialProducts);
  const [cartProducts, setCartProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isVisibleLogin, setIsVisibleLogin] = useState(false);
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const [isVisibleSignIn, setIsVisibleSignIn] = useState(true);
  const [total, setTotal] = useState(0);

  let navigate = useNavigate();
  useEffect(() => {
    calcTotal();
  }, [cartProducts]);

  function toggleFormSignIn() {
    setIsVisibleSignIn(!isVisibleSignIn);
    console.log("esta bien");
    navigate("/registro", { replace: true });
  }

  const sendOrder = async () => {
    try {
      const user = supabase.auth.user();
      console.log(user.email);

      const { error, data } = await takeInfoToSendOrder({ email: user.email });
      if (error) throw error;
      console.log(data);
      const [direcc] = data;
      const { address } = direcc;

      alert(`    su pedido esta en camino a la direccion ${address}
      total a pagar: $${total}
      gracias por preferirnos`);
      setCartProducts([]);
    } catch (error) {
      console.log(error);
    }
  };

  function showCart() {
    setIsVisible(!isVisible);
  }

  function showLogin() {
    setIsVisibleLogin(!isVisibleLogin);
  }

  function toggleMenu() {
    setIsVisibleMenu(!isVisibleMenu);
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
    setIsAuth(false);
    setIsVisibleMenu(false);
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
    <div className="main-container">
      <header className="header">
        <div className="container-logo">
          <img src={logo} alt="" className="logo" />
          <h1>
            <b>CompraYa</b>
          </h1>
          {isAuth && <BsCart2 className="icon" onClick={showCart}></BsCart2>}
        </div>

        <svg
          onClick={toggleMenu}
          className="hamburguer"
          fill="#e2682b"
          height="48"
          viewBox="0 0 24 24"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke="#e2682b"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="m5 7h14" />
            <path d="m5 12h14" />
            <path d="m5 17h14" />
          </g>
        </svg>

        <div className={`container-menu ${isVisibleMenu && "visible"}`}>
          {isAuth && <button onClick={logOut}>Cerrar sesion</button>}
          {!isAuth && <button onClick={toggleFormSignIn}>Registrarse</button>}
          {!isAuth && (
            <button onClick={showLogin}>
              <svg
                fill="#e2682b"
                height="48"
                viewBox="0 0 48 48"
                width="48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill={"currentColor"}>
                  <path d="m33 17c0 4.9725-4.0275 9-9 9s-9-4.0275-9-9 4.0275-9 9-9 9 4.0275 9 9z" />
                  <path d="m24 28c-6.0075 0-18 3.0347-18 8v6h36v-6c0-4.9653-11.9925-8-18-8z" />
                </g>
              </svg>
            </button>
          )}
        </div>
      </header>

      {isAuth && (
        <Cart
          cartProducts={cartProducts}
          isVisible={isVisible}
          deleteProduct={deleteProduct}
          addOneProduct={addOneProduct}
          total={total}
          isAuth={isAuth}
          sendOrder={sendOrder}
        />
      )}

      <div className="img-container">
        <div className="img">
          <h1 className="header-h1">
            Todo lo que necesitas al alcance de tu mano
          </h1>
        </div>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            !isAuth ? <CarouselNew autoPlay /> : <Navigate to="/hacer-pedido" />
          }
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

      <Footer />
      <Login
        isVisibleLogin={isVisibleLogin}
        setIsVisibleLogin={setIsVisibleLogin}
        showLogin={showLogin}
        setIsAuth={setIsAuth}
        setIsVisibleMenu={setIsVisibleMenu}
      />
    </div>
  );
};

export default CompraYa;
