import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ImageSlider from "./imageSlider/ImageSlider";
import { SliderData } from "./imageSlider/SliderData";
import novelService from "./services/NovelService";
import userService from "./services/UserService";

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
        {userService.isLoggedIn() && (
          <Grid container spacing={3}>
            <Grid item xs={1}></Grid>
            <Grid item xs={8}>
              <p style={{ fontSize: "3vw" }}>
                Welcome Home, {userService.getLoggedInUser().name + "!"}
              </p>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default LandingPage;
