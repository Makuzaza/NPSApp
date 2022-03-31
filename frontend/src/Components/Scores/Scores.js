import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { TitleText } from "../StyledComponents";

const Scores = ({ submissions }) => {
  return (
    <>
      <TitleText>Responses</TitleText>
      <Grid container spacing={3} data-testid="scores-grid">
        {submissions.map((submission) => (
          <Grid item xs={12} sm={6} md={4} key={submission._id}>
            <Card constiant="outlined">
              <CardContent>
                <Typography>
                  <span style={{ fontWeight: "bold" }}>id</span>:{" "}
                  {submission._id}
                </Typography>
                <Typography >
                  <span style={{ fontWeight: "bold" }}>Score</span>:{" "}
                  {submission.score}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Scores;
