import React, { useEffect, useState } from "react";

function CarouselNew(props) {
  const images = ["abarrotes.jpg", "carnes.jpg", "verduras.jpg"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (props.autoPlay) {
      const interval = setInterval(() => {
        selectIndex();
      }, 3000);
      return () => clearInterval(interval);
    }
  });

  const selectIndex = (next = true) => {
    setLoaded(false);
    setTimeout(() => {
      let nextIndex = null;
      next
        ? (nextIndex =
            selectedIndex < images.length - 1 ? selectedIndex + 1 : 0)
        : (nextIndex =
            selectedIndex > 0 ? selectedIndex - 1 : images.length - 1);

      setSelectedIndex(nextIndex);
      setSelectedImage(images[nextIndex]);
    }, 500);
  };

  const previous = () => {
    selectIndex(false);
  };

  const next = () => {
    selectIndex();
  };
  return (
    <div className="carousel-container">
     
        <h2>Disfruta de nuestra gran variedad</h2>
        <img
          className={`carousel-img && ${loaded && "loaded"}`}
          src={require(`../imagenes/${selectedImage}`)}
          alt="imagen"
          onLoad={() => setLoaded(true)}
        />
        {props.showButtons && (
          <div className="carousel-btn-container">
            <button className="carousel-btn" onClick={previous}>
              {"<"}
            </button>
            <button className="carousel-btn" onClick={next}>
              {">"}
            </button>
          </div>
        )}
      </div>
   
  );
}

export default CarouselNew;
