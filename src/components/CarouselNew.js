import React from "react";
import Carousel from "react-bootstrap/Carousel";
import abarrotes from "../imagenes/abarrotes.jpg";
import carnes from "../imagenes/carnes.jpg";
import verduras from "../imagenes/verduras.jpg";

const CarouselNew = () => {
  return (
    <div>
      <h2 className="text-center pt-5">Disfruta de nuestra gran variedad</h2>
      <Carousel className="p-2 d-flex justify-content-center align-items-center">
        <Carousel.Item className="">
          <img
            className="d-block my-2 mx-auto"
            src={verduras}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block my-2 mx-auto"
            src={carnes}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block my-2 mx-auto"
            src={abarrotes}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselNew;
