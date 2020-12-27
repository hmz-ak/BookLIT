import { Button, Divider, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import novelService from "../services/NovelService";
import userService from "../services/UserService";
import Chapters from "./Chapters";

const SingleNovel = (props) => {
  const [novel, setNovel] = useState([]);
  const [user_info, setUserInfo] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [library, setLibrary] = useState([]);
  const id = props.match.params.id;

  useEffect(() => {
    novelService
      .getSingleNovel(id)
      .then((data) => {
        setNovel(data.novel);
        setUserInfo(data.user_info);
        setChapters(data.chapters);
        setLibrary(data.library);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Grid container spacing={2} style={{ marginTop: "30px" }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <img
            className="image3"
            width="400px"
            height="400px"
            src={novel.image}
            alt=""
          />
        </Grid>
        <Grid item xs={6}>
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
          <h4>Theme of the story</h4>
          <em style={{ fontSize: "1.5vw" }}>{novel.theme}</em>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          {!chapters.length == 0 && (
            <Button
              style={{
                marginTop: "10px",
                marginRight: "10px",
                backgroundColor: "darkorange",
                color: "white",
              }}
              variant="contained"
            >
              Read Now
            </Button>
          )}
          {!library.length == 0 ? (
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              color="secondary"
            >
              Remove From Library
            </Button>
          ) : (
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              color="primary"
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
                  marginTop: "10px",
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
                  marginTop: "10px",
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
                  marginTop: "10px",
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
        <p style={{ textAlign: "center", fontSize: "20px", marginTop: "40px" }}>
          <strong>This story does not have any chapters yet!</strong>
        </p>
      )}
    </div>
  );
};

export default SingleNovel;
