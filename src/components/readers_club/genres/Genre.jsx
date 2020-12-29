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
  const classes = useStyles();

  useEffect(() => {
    genreService
      .getGenre()
      .then((data) => {
        setGenres(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(genres);

  return (
    <div>
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Grid container spacing={3}>
          {genres.map((genre, index) => {
            return (
              <Grid item xs={4}>
                <Card className={classes.root}>
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
    </div>
  );
};

export default withRouter(Genre);
