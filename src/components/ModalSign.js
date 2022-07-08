import React from "react";
import { useState } from "react";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";

const url = "http://localhost:5000/users";
const cookies = new Cookies();

const initialForm = {
  user: "",
  password: "",
};

const ModalSign = ({
  isVisibleLogin,
  setIsVisibleLogin,
  showLogin,
  setIsAuth,
}) => {

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signIn = async (e) => {
    e.preventDefault();
    setIsVisibleLogin(false);
    let res;
    await axios
      .get(url, {
        params: { user: form.user, password: md5(form.password) },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          console.log("se ha iniciado sesion");
          setIsAuth(true);
          res = response[0];
          cookies.set("id", res.id);
          cookies.set("nombre", res.nombre);
          alert("bienvenido");
        } else {
          alert("el usuario o la contraseña no son correctas");
          console.log("NOOOOO  se ha iniciado sesion");
          setIsAuth(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
      e.target.reset();
  };

  return (
    <article className={`modal-login ${!isVisibleLogin && "no-visible"}`}>
      <div className="modal-content-login">
        <svg
          onClick={() => showLogin()}
          className="close"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
        </svg>
        <form className="form-login" id="form" onSubmit={signIn}>
          <h2 className="title">
            <b>CompraYa</b>
          </h2>
          <label htmlFor="Email">Usuario</label>
          <input type="text" size="40" name="user" onChange={handleChange} />
          <label htmlFor="Contraseña">Contraseña</label>
          <input
            type="text"
            size="40"
            name="password"
            onChange={handleChange}
          />
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </article>
  );
};

export default ModalSign;
