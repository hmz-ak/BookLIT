import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import { withRouter } from "react-router";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import genreService from "../../services/GenreService";
import { Container, Grid } from "@material-ui/core";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    borderRadius: "10px",
  },
  media: {
    height: 300,
  },
});
const GenreSpecificStory = (props) => {
  const [novels, setNovels] = useState([]);
  const [loader, setLoader] = useState(true);

  const genre = props.match.params.name;
  const classes = useStyles();

  useEffect(() => {
    genreService
      .getSingleGenre(genre)
      .then((data) => {
        console.log(data);
        setNovels(data);
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
        <Container maxWidth="lg" style={{ marginTop: "50px" }}>
          <Grid container spacing={3}>
            {novels.map((novel, index) => {
              return (
                <Grid item xs={4}>
                  <Card
                    className={classes.root}
                    onClick={(e) => {
                      props.history.push("/novels/" + novel._id);
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={novel.image}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography style={{ height: "40px" }}>
                          {novel.name}
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
  );
};

export default withRouter(GenreSpecificStory);
