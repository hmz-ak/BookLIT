import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import userService from "../../services/UserService";
import { toast } from "react-toastify";
import genreService from "../../services/GenreService";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import novelService from "../../services/NovelService";
import { withRouter } from "react-router";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
  },
  child: {
    width: "600px",
  },
}));

const UpdateStory = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [password, setPassword] = useState("");
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    genreService
      .getGenre()
      .then((data) => {
        setGenre(data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(selectedGenre);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedGenre);
    if (!selectedGenre == "") {
      setLoader(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("genre", selectedGenre);
      formData.append("theme", theme);
      formData.append("image", file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      novelService
        .addNovel(formData, config)
        .then((data) => {
          console.log(data);
          setLoader(false);
          props.history.push("/new/chapter/" + data.novel._id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Select Genre!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className={classes.container}>
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
        <div className={classes.child}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="title"
              fullWidth
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Give a name to your story"
            />{" "}
            <br />
            <Button
              style={{ marginTop: "10px" }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              variant="outlined"
              fullWidth
            >
              {selectedGenre ? selectedGenre : "Choose genre"}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              required
              open={Boolean(anchorEl)}
              onClose={handleClose}
              fullWidth
            >
              {genre.map((item, index) => {
                return (
                  <div key={index}>
                    <MenuItem
                      required
                      width="100%"
                      onClick={(e) => {
                        setSelectedGenre(item.name);
                        handleClose();
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  </div>
                );
              })}
            </Menu>
            <br />
            <br />
            <TextField
              id="outlined-multiline-static"
              label="Theme"
              required
              multiline
              rows={12}
              fullWidth
              variant="outlined"
              placeholder="Enter theme of your story"
              onChange={(e) => {
                setTheme(e.target.value);
              }}
            />
            <br />
            <br />
            <input
              accept="image/*"
              name="image"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />{" "}
            <br />
            <br />
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default withRouter(UpdateStory);
