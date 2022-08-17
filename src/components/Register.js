import React from "react";
import { useState } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { createUser } from "../supabase/supabase";



const initialForm = {
  name: "",
  email: "",
  user: "",
  password: "",
  address: "",
};
const SignInForm = ({ toggleFormSignIn, isVisibleSignIn }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClean = () => {
    setForm(initialForm);
  };

  const sendData = async (e) => {
    e.preventDefault();
    createUser(form);
    alert("usuario creado con éxito, por favor revisa tu correo para confirmar");
    window.location.reload();
    handleClean();
    
  };

  const back = () =>{
    toggleFormSignIn();
  }

  return (
    <div className={`register ${isVisibleSignIn && "hidden"}`}>
      <h2 className="title">
        <b>CompraYa</b>
      </h2>
      <h2 className="text-center">Te damos la bienvenida</h2>
      <form className="register-form" onSubmit={sendData}>
        <label className="label" htmlFor="name">
          Nombres y apellidos
        </label>
        <input
          className="input "
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <label className="label" htmlFor="email">
          correo
        </label>
        <input
          className="input"
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <label className="label" htmlFor="usuario">
          usuario
        </label>
        <input
          className="input"
          type="text"
          name="user"
          value={form.user}
          onChange={handleChange}
        />
        <label className="label" htmlFor="contraseña">
          Contraseña
        </label>
        <input
          className="input"
          type="text"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <label className="label" htmlFor="address">
          Dirección
        </label>
        <input
          className="input"
          type="text"
          name="address"
          onChange={handleChange}
          value={form.address}
        />
        <div className=" register-btn-container">
          <button className="register-btn " type="submit" value="Enviar">
            Enviar
          </button>
        </div>
        <div className="register-btn-container">
          <button onClick={handleClean} className="register-btn gray" type="reset" value="Limpiar">
            Limpiar
          </button>
        </div>
        <div className="container-icon" onClick={back}>
          <BsFillArrowLeftSquareFill className="icon" />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
