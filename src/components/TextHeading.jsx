import { Container, Grid } from "@material-ui/core";
import React from "react";

const TextHeading = ({ text }) => {
  return (
    <div style={{ marginTop: "40px" }}>
      <Container>
        <p
          style={{
            fontSize: "2.5vw",
            fontWeight: "700",
          }}
        >
          {text}
        </p>
      </Container>
    </div>
  );
};

export default TextHeading;
