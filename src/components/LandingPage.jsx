import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ImageSlider from "./imageSlider/ImageSlider";
import ItemsSlider from "./imageSlider/ItemsSlider";
import novelService from "./services/NovelService";
import userService from "./services/UserService";
import TextHeading from "./TextHeading";

const LandingPage = () => {
  const [novels, setNovels] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [selected, setSelected] = useState([]);
  const [header, setHeader] = useState([]);

  const getData = () => {
    novelService
      .getNovel()
      .then((data) => {
        setNovels(data.novels);
        setCompleted(data.completed);
        setSelected(data.randomData);
        setHeader(data.header);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getData, []);

  return (
    <div>
      <Container maxWidth="lg">
        <ImageSlider slides={header} />
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
        <div style={{ backgroundColor: "#f7f7f7", padding: "15px" }}>
          <TextHeading text={"BEST READS"} />
          <ItemsSlider items={completed} />
          <TextHeading text={"TOP PICKS FOR YOU!"} />
          <ItemsSlider items={novels} />
          <TextHeading text={"YOU MAY ALSO LIKE"} />
          <ItemsSlider items={selected} />
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
