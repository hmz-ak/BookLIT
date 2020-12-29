import {
  Button,
  Divider,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import novelService from "../../services/NovelService";
import userService from "../../services/UserService";
import chapterService from "../../services/ChapterService";
import Chapters from "../chapters/Chapters";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import libraryService from "../../services/LibraryService";

const SingleNovel = (props) => {
  const [novel, setNovel] = useState([]);
  const [user_info, setUserInfo] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [library, setLibrary] = useState([]);
  const [loader, setLoader] = useState(true);

  const id = props.match.params.id;

  useEffect(() => {
    novelService
      .getSingleNovel(id)
      .then((data) => {
        setNovel(data.novel);
        setUserInfo(data.user_info);
        setChapters(data.chapters);
        setLibrary(data.library);
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
                timeout={6000} //6 secs
              />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <>
          <Grid container spacing={2} style={{ marginTop: "30px" }}>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              <img
                className="image3"
                width="300px"
                height="400px"
                src={novel.image}
                alt=""
              />
            </Grid>
            <Grid item xs={7}>
              Name <strong>{novel.name}</strong>
              <br />
              <br />
              Genre <strong>{novel.genre}</strong>
              <br />
              <br />
              Written by <strong>{user_info.name}</strong>
              <hr style={{ marginTop: "30px" }} />
              <br />
              <br />
              <Typography variant="h5">Theme of the story</Typography>
              <Typography variant="body2" style={{ marginTop: "15px" }}>
                {novel.theme}
              </Typography>
            </Grid>
          </Grid>
          {userService.isLoggedIn() && (
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={5}>
                {!chapters.length == 0 && (
                  <Button
                    style={{
                      marginTop: "30px",
                      marginRight: "20px",
                      backgroundColor: "darkorange",
                      color: "white",
                    }}
                    variant="contained"
                    onClick={(e) => {
                      chapterService
                        .getSingleChapter(chapters[0]._id)
                        .then((data) => {
                          console.log(data);
                          props.history.push("/chapter/" + data.chapter._id);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Read Now
                  </Button>
                )}
                {!library.length == 0 ? (
                  <Button
                    style={{ marginTop: "30px" }}
                    variant="contained"
                    color="secondary"
                  >
                    Remove From Library
                  </Button>
                ) : (
                  <Button
                    style={{ marginTop: "30px" }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      console.log(novel._id);

                      libraryService
                        .addLibrary(novel)
                        .then((data) => {
                          console.log(data);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Add To Library
                  </Button>
                )}
              </Grid>

              <Grid item xs={6}>
                {novel.user_id == userService.getLoggedInUser()._id && (
                  <>
                    <Button
                      style={{
                        marginTop: "30px",
                        backgroundColor: "goldenrod",
                        color: "white",
                        marginRight: "10px",
                      }}
                      variant="contained"
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
                    >
                      Delete
                    </Button>
                    <Button
                      style={{
                        marginTop: "30px",
                        backgroundColor: "mediumvioletred",
                        color: "white",
                        marginRight: "10px",
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Add New Chapter
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          )}

          <Divider style={{ marginTop: "50px", marginBottom: "20px" }} />
          {!chapters.length == 0 ? (
            <>
              <Grid container spacing={4}>
                <Grid item xs={5}></Grid>
                <Grid item xs={4}>
                  <h2>TABLE OF CONTENTS</h2>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={4}></Grid>
                <Grid item xs={8}>
                  <Chapters chapters={chapters} />
                </Grid>
              </Grid>
            </>
          ) : (
            <p
              style={{
                textAlign: "center",
                fontSize: "20px",
                marginTop: "40px",
              }}
            >
              <strong>This story does not have any chapters yet!</strong>
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default SingleNovel;
