import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import userService from "./services/UserService";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    marginRight: "30px",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Nav1 = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={(e) => {
          handleMenuClose();
          props.history.push("/newstory");
        }}
      >
        Write
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          handleMenuClose();
          props.history.push("/mystory");
        }}
      >
        My Stories
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!userService.isLoggedIn() ? (
        <div>
          <MenuItem
            onClick={(e) => {
              handleMenuClose();
              props.history.push("/login");
            }}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <MeetingRoomIcon />
            </IconButton>
            <p>Login</p>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleMenuClose();
              props.history.push("/register");
            }}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <HowToRegIcon />
            </IconButton>
            <p>Register</p>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuBookIcon />
            </IconButton>
            <p>Stories</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              onClick={(e) => {
                props.history.push("/");
              }}
              color="inherit"
            >
              <ShoppingCartIcon />
            </IconButton>
            <p>Cart</p>
          </MenuItem>

          <MenuItem
            onClick={(e) => {
              userService.logout();
              window.location.reload();
              handleMenuClose();
            }}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <MeetingRoomIcon />
            </IconButton>
            <p>Logout</p>
          </MenuItem>
        </div>
      )}
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            BOOKLIT
          </Typography>
          {!userService.isLoggedIn() ? (
            <Button
              size="small"
              style={{
                marginRight: "20px",
              }}
              color="inherit"
              variant="outlined"
              onClick={(e) => {
                props.history.push("/");
              }}
            >
              HOME
            </Button>
          ) : (
            <div>
              <Button
                size="small"
                style={{
                  marginRight: "20px",
                }}
                color="inherit"
                variant="outlined"
                onClick={(e) => {
                  props.history.push("/");
                }}
              >
                HOME
              </Button>
              <Button
                size="small"
                style={{
                  marginRight: "20px",
                }}
                color="inherit"
                variant="outlined"
                onClick={(e) => {
                  props.history.push("/genre");
                }}
              >
                BROWSE
              </Button>
              <Button
                size="small"
                style={{
                  marginRight: "20px",
                }}
                color="inherit"
                variant="outlined"
                onClick={(e) => {
                  props.history.push("/library");
                }}
              >
                LIBRARY
              </Button>
            </div>
          )}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {!userService.isLoggedIn() ? (
              <>
                <Button
                  size="small"
                  style={{ background: "#000000" }}
                  color="inherit"
                  variant="outlined"
                  onClick={(e) => {
                    props.history.push("/login");
                  }}
                >
                  Login
                </Button>

                <Button
                  style={{
                    background: "#000000",
                    marginLeft: 10,
                    color: "white",
                  }}
                  size="small"
                  variant="outlined"
                  color="inherit"
                  onClick={(e) => {
                    props.history.push("/register");
                  }}
                >
                  Register
                </Button>
              </>
            ) : (
              <div>
                <IconButton onClick={handleProfileMenuOpen} color="inherit">
                  <MenuBookIcon />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    props.history.push("/");
                  }}
                  color="inherit"
                >
                  <ShoppingCartIcon />
                </IconButton>
                <Button
                  style={{ marginLeft: "20px" }}
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={(e) => {
                    userService.logout();
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default withRouter(Nav1);
