import { Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function Foot({ text }) {
  return (
    <Link style={{ textDecoration: "none" }} to="/">
      <li style={{ marginRight: "10px" }}>
        {" "}
        <strong> {text}</strong>
      </li>
    </Link>
  );
}

const Footer = () => {
  return (
    <div style={{ marginTop: "60px" }} className="footer">
      <Grid container spacing={3}>
        <Grid item xs={2}></Grid>
        <Grid item xs={10}>
          <ul id="menu">
            <Foot text={"Paid Stories"} />
            <Foot text={"Try Premium"} />
            <Foot text={"Get the App"} />
            <Foot text={"Language"} />
            <Foot text={"Writers"} />
            <Foot text={"|"} />
            <Foot text={"Business"} />
            <Foot text={"Jobs"} />
            <Foot text={"Press"} />
            <Foot text={"Terms"} />
            <Foot text={"Privacy"} />
            <Foot text={"Help"} />
          </ul>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
