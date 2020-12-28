import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router";
import userService from "../services/UserService";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Chapters = (props) => {
  const { chapters } = props;
  console.log(props);
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {chapters.map((chapter, index) => {
        return (
          <>
            <ListItem
              key={index}
              button
              onClick={(e) => {
                userService.isLoggedIn()
                  ? props.history.push("/chapter/" + chapter._id)
                  : toast.error("You Need To Log In To Read This Chapter!", {
                      position: toast.POSITION.TOP_CENTER,
                    });
              }}
            >
              <ListItemText primary={chapter.title} />
            </ListItem>
            <Divider />
          </>
        );
      })}
    </List>
  );
};

export default withRouter(Chapters);
