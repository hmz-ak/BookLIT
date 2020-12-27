import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Chapters({ chapters }) {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {chapters.map((chapter) => {
        return (
          <>
            <ListItem button>
              <ListItemText primary={chapter.title} />
            </ListItem>
            <Divider />
          </>
        );
      })}
    </List>
  );
}
