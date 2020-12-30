import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import genreService from "../../services/GenreService";
import { withRouter } from "react-router";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Auth from "../../auth/Auth";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    borderRadius: "10px",
  },
  media: {
    height: 200,
  },
});

const Genre = (props) => {
  const [genres, setGenres] = useState([]);
  const [loader, setLoader] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    genreService
      .getGenre()
      .then((data) => {
        setGenres(data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(genres);

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
                  timeout={6000} //6 secs
                />
              </Grid>
            </Grid>
          </Container>
        ) : (
          <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <Grid container spacing={3}>
              {genres.map((genre, index) => {
                return (
                  <Grid item xs={4}>
                    <Card
                      className={classes.root}
                      onClick={(e) => {
                        props.history.push("/genre/" + genre.name);
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={genre.image}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {genre.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        )}
      </div>
    </Auth>
  );
};

export default withRouter(Genre);
