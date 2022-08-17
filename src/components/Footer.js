import React from "react";
import logo from "../imagenes/logo.jpg";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { IoLogoGooglePlaystore } from "react-icons/io5";
// ESTILOS DEL FOOTER HECHOS CON BOOTSTRAP

const Footer = () => {
  return (
    <div>
      <footer className="footer main-color">
        <div className="footer-img col-12 col-md-4 d-flex justify-content-center align-items-center">
          <img src={logo} alt="" className="my-2" height={100} />
        </div>

        <ul className="footer-contacto">
          <li>Contacto </li>
          <li> 3155555555 </li>
          <li> compraya@gmail.com </li>
          <li> calle 78 #45-56 barrio la española</li>
        </ul>

        <ul className="footer-social col-12 col-md-4 list-unstyled d-flex align-items-center justify-content-evenly">
          <BsFacebook className="social-icon"></BsFacebook>
          <BsInstagram className="social-icon"></BsInstagram>
          <BsTwitter className="social-icon"></BsTwitter>
          <IoLogoGooglePlaystore className="social-icon"></IoLogoGooglePlaystore>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
