import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const ImageSlider = (props) => {
  const { slides } = props;
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />

      {slides.map((slide, index) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            key={index}
            className={index === current ? "slide active" : "slide"}
          >
            {index === current && (
              <img
                src={slide.image}
                alt="travel image"
                className="image"
                onClick={(e) => {
                  props.history.push("/novels/" + slide._id);
                }}
              />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default withRouter(ImageSlider);
