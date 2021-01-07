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
import { toast } from "react-toastify";
import { FaWindows } from "react-icons/fa";
import Auth from "../../auth/Auth";

const SingleNovel = (props) => {
  const [novel, setNovel] = useState([]);
  const [user_info, setUserInfo] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [library, setLibrary] = useState([]);
  const [loader, setLoader] = useState(true);
  const [trigger, setTrigger] = useState(false);

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
  }, [trigger]);

  return (
    <Auth>
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
                  timeout={10000} //10 secs
                />
              </Grid>
            </Grid>
          </Container>
        ) : (
          <>
            <Grid container style={{ marginTop: "30px" }}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10} md={10} lg={1}>
                <img
                  className="image3"
                  width="300px"
                  height="400px"
                  src={novel.image}
                  alt=""
                />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={10} md={11} lg={7}>
                <br />
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
                <Grid item xs={11} md={5}>
                  {!chapters.length == 0 && (
                    <Button
                      style={{
                        marginTop: "30px",
                        marginRight: "20px",
                        backgroundColor: "darkorange",
                        color: "white",
                      }}
                      variant="contained"
                      size="small"
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
                      size="small"
                      onClick={(e) => {
                        libraryService
                          .deleteLibrary(novel._id)
                          .then((data) => {
                            console.log(data);
                            toast.info("Removed From Library", {
                              position: toast.POSITION.TOP_CENTER,
                            });
                            window.location.reload();
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                        setTrigger(false);
                      }}
                    >
                      Remove From Library
                    </Button>
                  ) : (
                    <Button
                      style={{ marginTop: "30px" }}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        console.log(novel._id);
                        libraryService
                          .addLibrary(novel)
                          .then((data) => {
                            console.log(data);
                            toast.info("Added To Library", {
                              position: toast.POSITION.TOP_CENTER,
                            });
                            window.location.reload();
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                        setTrigger(true);
                      }}
                    >
                      Add To Library
                    </Button>
                  )}
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={11} md={5}>
                  {novel.user_id == userService.getLoggedInUser()._id && (
                    <>
                      <Button
                        size="small"
                        style={{
                          marginTop: "30px",
                          backgroundColor: "goldenrod",
                          color: "white",
                          marginRight: "10px",
                        }}
                        variant="contained"
                        onClick={(e) => {
                          props.history.push("/novels/update/" + novel._id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        style={{
                          marginTop: "30px",
                          backgroundColor: "indianred",
                          color: "white",
                          marginRight: "10px",
                        }}
                        variant="contained"
                        onClick={(e) => {
                          setLoader(true);
                          novelService
                            .deleteNovel(novel._id)
                            .then((data) => {
                              console.log(data);
                              setLoader(false);

                              props.history.push("/");
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        style={{
                          marginTop: "30px",
                          backgroundColor: "mediumvioletred",
                          color: "white",
                          marginRight: "10px",
                        }}
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          props.history.push("/new/chapter/" + novel._id);
                        }}
                      >
                        New Chapter
                      </Button>
                    </>
                  )}
                </Grid>
              </Grid>
            )}

            <Divider style={{ marginTop: "50px", marginBottom: "20px" }} />
            {!chapters.length == 0 ? (
              <>
                <Grid container>
                  <Grid item xs={3} md={4}></Grid>
                  <Grid item xs={6}>
                    <h2>TABLE OF CONTENTS</h2>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={3} md={4}></Grid>
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
    </Auth>
  );
};

export default SingleNovel;
