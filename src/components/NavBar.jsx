import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import userService from "./services/UserService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "black",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  link2: {
    color: "black",
    textDecoration: "none",
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ background: "#FFFFFF" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link2}>
              Readers Club
            </Link>
          </Typography>
          {!userService.isLoggedIn() ? (
            <>
              <Link to="/login" className={classes.link}>
                <Button style={{ background: "#000000" }} color="inherit">
                  Login
                </Button>
              </Link>
              <Button
                style={{ background: "#000000", marginLeft: 10 }}
                color="inherit"
              >
                Register
              </Button>
            </>
          ) : (
            <Button
              style={{ background: "#000000" }}
              color="inherit"
              onClick={(e) => {
                userService.logout();
                window.location.reload();
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
