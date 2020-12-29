import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import userService from "../services/UserService";
import { toast } from "react-toastify";
import genreService from "../services/GenreService";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import novelService from "../services/NovelService";

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

const NewStory = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [password, setPassword] = useState("");
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [file, setFile] = useState(null);

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
    // axios
    //   .post("/upload", formData, config)
    //   .then((response) => {
    //     alert("The file is successfully uploaded");
    //   })
    //   .catch((error) => {});
    novelService
      .addNovel(formData, config)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.child}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="title"
            fullWidth
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
            open={Boolean(anchorEl)}
            onClose={handleClose}
            fullWidth
          >
            {genre.map((item, index) => {
              return (
                <div key={index}>
                  <MenuItem
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
    </div>
  );
};

export default NewStory;
