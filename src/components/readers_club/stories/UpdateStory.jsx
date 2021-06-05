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
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Auth from "../../auth/Auth";

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
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [paid, setPaid] = useState(false);
  const [paidValue, setPaidValue] = useState(0);

  const id = props.match.params.id;
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

  useEffect(() => {
    setLoader(true);
    novelService
      .getSingleNovel(id)
      .then((data) => {
        console.log(data.novel.theme);
        setName(data.novel.name);
        setTheme(data.novel.theme);
        setSelectedGenre(data.novel.genre);
        setPaid(data.novel.paid);
        setPaidValue(data.novel.price);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(`count changed to ${paidValue}`);
    console.log(`paid changed to ${paid}`);
  }, [paidValue, paid]);

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
      formData.append("paid", paid);
      formData.append("price", paidValue);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      novelService
        .updateNovel(id, formData, config)
        .then((data) => {
          console.log(data);
          setLoader(false);
          props.history.push("/novels/" + id);
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
    <Auth>
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
            <br />
            <br />
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
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    onClick={(e) => {
                      setPaid((paid) => !paid);
                      console.log(paid);
                    }}
                    checked={paid}
                    control={<Switch color="primary" />}
                    label="Paid?"
                    labelPlacement="start"
                  />
                  {paid ? (
                    <TextField
                      style={{ marginLeft: 20 }}
                      id="standard-basic"
                      label="Enter Amount"
                      value={paidValue}
                      onChange={(e) => {
                        setPaidValue(e.target.value);

                        console.log(paidValue);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </FormGroup>
              </FormControl>
              <br />
              <br />
              <TextField
                id="outlined-multiline-static"
                label="Theme"
                required
                multiline
                rows={12}
                fullWidth
                value={theme}
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
                Update
              </Button>
            </form>
          </div>
        )}
      </div>
    </Auth>
  );
};

export default withRouter(UpdateStory);
