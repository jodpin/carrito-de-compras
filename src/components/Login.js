import React from "react";
import { useState } from "react";
import supabase from "../supabase/supabase";

const initialForm = {
  user: "",
  password: "",
};

const ModalSign = ({
  isVisibleLogin,
  setIsVisibleLogin,
  showLogin,
  setIsAuth,
  setIsVisibleMenu
}) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signIn = async (e) => {
    e.preventDefault();
    setIsVisibleMenu(false);
    try {
      let { user, error } = await supabase.auth.signIn({
        email: form.user,
        password: form.password,
      });
      if (error) throw error;
      console.log(user);
      setIsAuth(true);
      setIsVisibleLogin(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }

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
          <label className="login-label" htmlFor="Email">
            Usuario
          </label>
          <input
            type="text"
            size="40"
            name="user"
            onChange={handleChange}
            value={form.user}
            className="login-input"
          />
          <label className="login-label" htmlFor="Contraseña">
            Contraseña
          </label>
          <input
            className="login-input"
            type="password"
            size="40"
            name="password"
            onChange={handleChange}
            value={form.password}
          />
          <input className="login-submit-btn" type="submit" value="Enviar" />
          {error && <p className="error">datos incorrectos</p>}
        </form>
      </div>
    </article>
  );
};

export default ModalSign;
