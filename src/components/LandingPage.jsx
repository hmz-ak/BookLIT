import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ImageSlider from "./imageSlider/ImageSlider";
import { SliderData } from "./imageSlider/SliderData";
import novelService from "./services/NovelService";

const LandingPage = () => {
  const [novels, setNovels] = useState([]);

  const getData = () => {
    novelService
      .getNovel()
      .then((data) => {
        setNovels(data.novels);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getData, []);

  return (
    <div>
      <Container maxWidth="lg">
        <ImageSlider slides={novels} />
      </Container>
    </div>
  );
};

export default LandingPage;
