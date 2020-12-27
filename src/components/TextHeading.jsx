import { Container, Grid } from "@material-ui/core";
import React from "react";

const TextHeading = ({ text }) => {
  return (
    <div style={{ marginTop: "40px" }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={1}></Grid>
          <Grid item xs={8}>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "700",
                marginLeft: "-49px",
              }}
            >
              {text}
            </p>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TextHeading;
