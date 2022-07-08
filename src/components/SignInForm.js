import React from "react";
import { useState } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import axios from "axios";
import md5 from "md5";

const url = "http://localhost:5000/users";

const initialForm = {
  name: "",
  lastname: "",
  user: "",
  password: "",
  address: "",
};
const SignInForm = ({ toggleFormSignIn, isVisibleSignIn }) => {
  const [form, setForm] = useState(initialForm);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendData = async (e) => {
    e.preventDefault();
    form.password = md5(form.password);
   toggleFormSignIn();
    await axios
      .post(url, form)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
  };

  
  return (
    <div className={`position-fixed bg-white w-100 h-100 z-index-1999 ${isVisibleSignIn && "hidden"}`}>
      <h2 className="title text-center">
        <b>CompraYa</b>
      </h2>
      <h2 className="text-center">Te damos la bienvenida</h2>
      <form
        className="sign-in-form d-flex flex-column align-items-center justify-content-center"
        onSubmit={sendData}
      >
        <label htmlFor="nombre">
          <b>Nombre</b>
        </label>
        <input
          className="input rounded border border-secondary"
          type="text"
          name="name"
          onChange={handleChange}
        />
        <label htmlFor="apellido">
          <b>Apellido</b>
        </label>
        <input
          className="input rounded border border-secondary"
          type="text"
          name="lastname"
          onChange={handleChange}
        />
        <label htmlFor="usuario">
          <b>Usuario</b>
        </label>
        <input
          className="input rounded border border-secondary"
          type="text"
          name="user"
          onChange={handleChange}
        />
        <label htmlFor="contraseña">
          <b>Contraseña</b>
        </label>
        <input
          className="input rounded border border-secondary"
          type="text"
          name="password"
          onChange={handleChange}
        />
        <label htmlFor="direccion">
          <b>Direccion</b>
        </label>
        <input
          className="input rounded border border-secondary"
          type="text"
          name="address"
          onChange={handleChange}
        />
        <div className="d-flex justify-content-around input">
          <button className="btn btn-success w-75" type="submit" value="Enviar">
            Enviar
          </button>
        </div>
        <div className="d-flex justify-content-around input">
          <button
            className="btn btn-secondary w-75"
            type="reset"
            value="Limpiar"
          >
            Limpiar
          </button>
        </div>
        <div className="container-icon-cart" onClick={toggleFormSignIn}>
          <BsFillArrowLeftSquareFill className="icon" />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
