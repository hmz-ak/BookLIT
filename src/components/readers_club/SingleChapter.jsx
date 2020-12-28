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
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <img
                className="image3"
                width="400px"
                height="400px"
                src={chapter.image}
                alt=""
              />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="h4"
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                {chapter.title}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Container
            maxWidth="lg"
            style={{
              backgroundColor: "whitesmoke",
              borderRadius: "20px",
              marginTop: "40px",
              padding: "20px",
            }}
          >
            <Typography variant="h5" component="h3">
              {chapter.content}
            </Typography>
          </Container>
        </>
      )}
    </div>
  );
};

export default SingleChapter;
