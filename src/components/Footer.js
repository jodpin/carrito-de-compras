import React from 'react';
import logo from "../imagenes/logo.jpg";
import { BsFacebook, BsInstagram, BsTwitter} from "react-icons/bs";
import {  IoLogoGooglePlaystore  } from "react-icons/io5";
// ESTILOS DEL FOOTER HECHOS CON BOOTSTRAP

const Footer = () => {
  return (
    <div>
        <footer className=' text-white py-4 main-color'>
            <div className='container'>
                <nav className='row'>
                    <div className='col-12 col-md-4 d-flex justify-content-center align-items-center'>
                        <img src={logo} alt="" className='my-2' height={100}/>
                    </div>

                    <ul className='col-12 col-md-4 list-unstyled'>
                        <li className='font-weight-bold text-center '>Contacto <hr /></li>
                        <li className='text-center font-weight-light'> 3155555555 </li>
                        <li className='text-center font-weight-light'> compraya@gmail.com </li>
                        <li className='text-center font-weight-light'> calle 78 #45-56 barrio la española</li>
                    </ul>

                    <ul className='col-12 col-md-4 list-unstyled d-flex align-items-center justify-content-evenly'>

                       <BsFacebook className='social-icon'></BsFacebook>
                       <BsInstagram className='social-icon'></BsInstagram>
                       <BsTwitter className='social-icon'></BsTwitter>
                       <IoLogoGooglePlaystore className='social-icon'></IoLogoGooglePlaystore>

                    </ul>

                </nav>
            </div>
        </footer>
    </div>
  )
}

export default Footer