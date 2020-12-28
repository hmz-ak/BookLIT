import { Container, Divider, Grid, Typography } from "@material-ui/core";
import chapterService from "../services/ChapterService";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { useEffect, useState } from "react";

const SingleChapter = (props) => {
  const id = props.match.params.id;
  const [chapter, setChapter] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    chapterService
      .getSingleChapter(id)
      .then((data) => {
        setChapter(data.chapter);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
        <>
          <Grid container spacing={3} style={{ marginTop: "30px" }}>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                filter: "brightness(20%)",
                opacity: "0.9",
              }}
            >
              <img
                className="image3"
                width="1280px"
                height="400px"
                src={chapter.image}
                alt=""
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                component="h4"
                style={{
                  position: "absolute",
                  textAlign: "center",
                  bottom: "30%",
                  width: "100%",
                  color: "whitesmoke",

                  fontWeight: "bold",
                }}
              >
                {chapter.title}
              </Typography>
            </Grid>
          </Grid>
          <Container
            maxWidth="lg"
            className="shadow"
            style={{
              marginTop: "40px",
              padding: "30px",
            }}
          >
            <Typography
              variant="h4"
              component="h3"
              style={{ lineHeight: 1.8, fontSize: "25px" }}
            >
              {chapter.content}
            </Typography>
          </Container>
        </>
      )}
    </div>
  );
};

export default SingleChapter;
