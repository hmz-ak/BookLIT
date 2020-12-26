import { Container } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";
import ImageSlider from "./imageSlider/ImageSlider";
import { SliderData } from "./imageSlider/SliderData";

const LandingPage = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <ImageSlider slides={SliderData} />
      </Container>
    </div>
  );
};

export default LandingPage;
