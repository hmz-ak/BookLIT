import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ImageSlider from "./imageSlider/ImageSlider";
import ItemsSlider from "./imageSlider/ItemsSlider";
import novelService from "./services/NovelService";
import userService from "./services/UserService";
import TextHeading from "./TextHeading";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LandingPage = () => {
  const [novels, setNovels] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [selected, setSelected] = useState([]);
  const [header, setHeader] = useState([]);
  const [loader, setLoader] = useState(true);
  const getData = () => {
    novelService
      .getNovel()
      .then((data) => {
        setNovels(data.novels);
        setCompleted(data.completed);
        setSelected(data.randomData);
        setHeader(data.header);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getData, []);

  return (
    <div>
      {loader ? (
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10%",
                marginBottom: "20%",
              }}
            >
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
            </Grid>
          </Grid>
        </Container>
      ) : (
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
      )}
    </div>
  );
};

export default LandingPage;
