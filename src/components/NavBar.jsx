import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import userService from "./services/UserService";
import { Divider, Menu, MenuItem } from "@material-ui/core";
import { withRouter } from "react-router";

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
  link3: {
    color: "black",
    textDecoration: "none",
    marginRight: "15px",
    fontWeight: 600,
  },
}));

const NavBar = (props) => {
  console.log(props);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#FFFFFF" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link2}>
              <strong>BOOKLIT</strong>
            </Link>
          </Typography>
          <ul
            id="menu"
            style={{
              marginRight: "60%",
            }}
          >
            <li>
              <Link to="/" className={classes.link3}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/genre" className={classes.link3}>
                BROWSE
              </Link>
            </li>
            <li>
              <Link to="/library" className={classes.link3}>
                LIBRARY
              </Link>
            </li>
          </ul>

          {!userService.isLoggedIn() ? (
            <>
              <Link to="/login" className={classes.link}>
                <Button
                  size="small"
                  style={{ background: "#000000" }}
                  color="inherit"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register" className={classes.link}>
                <Button
                  style={{
                    background: "#000000",
                    marginLeft: 10,
                    color: "white",
                  }}
                  size="small"
                  color="inherit"
                >
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ marginRight: "30px" }}
              >
                Write
              </Button>
              ]
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={(e) => {
                    handleClose();
                    props.history.push("/newstory");
                  }}
                >
                  Create a new story
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={(e) => {
                    handleClose();
                    props.history.push("/mystory");
                  }}
                >
                  My Stories
                </MenuItem>
              </Menu>
              <Button
                style={{ background: "#000000" }}
                color="inherit"
                size="small"
                onClick={(e) => {
                  userService.logout();
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavBar);
