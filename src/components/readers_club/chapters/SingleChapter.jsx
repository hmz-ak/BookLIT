import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import chapterService from "../../services/ChapterService";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { useEffect, useState } from "react";
import userService from "../../services/UserService";
import Chapters from "./Chapters";
import { withRouter } from "react-router-dom";

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
          <Grid container>
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
                timeout={6000} //6 secs
              />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <>
          <Grid container>
            <Grid item xs={4}></Grid>
            <Grid
              item
              xs={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {chapter.user_id[0] == userService.getLoggedInUser()._id && (
                <>
                  <Button
                    style={{
                      marginTop: "30px",
                      backgroundColor: "goldenrod",
                      color: "white",
                      marginRight: "10px",
                    }}
                    variant="contained"
                    onClick={(e) => {
                      props.history.push("/chapter/update/" + chapter._id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{
                      marginTop: "30px",
                      backgroundColor: "indianred",
                      color: "white",
                      marginRight: "10px",
                    }}
                    variant="contained"
                    onClick={(e) => {
                      setLoader(true);
                      chapterService
                        .deleteChapter(chapter._id)
                        .then((data) => {
                          console.log(data);
                          setLoader(false);
                          props.history.push("/novels/" + chapter.novel_id[0]);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Grid>

            <Grid item xs={4}></Grid>
          </Grid>
          <Grid container style={{ marginTop: "30px" }}>
            <Grid item xs={1}></Grid>
            <Grid
              item
              xs={10}
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
            <Grid item xs={1}></Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                component="h4"
                style={{
                  position: "absolute",
                  textAlign: "center",
                  top: "30%",
                  width: "100%",
                  height: "100%",
                  color: "whitesmoke",
                  fontWeight: "bold",
                }}
              >
                {chapter.title}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
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
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default withRouter(SingleChapter);
