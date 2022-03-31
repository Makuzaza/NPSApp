import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { TitleText } from "../StyledComponents";

const FeedbackMessages = ({ submissions }) => {
  return (
    <>
      <TitleText>Feedback</TitleText>
      <Grid container spacing={3} data-testid="feedback-grid">
        {submissions
          .filter((sub) => sub.feedback)
          .map((submission) => (
            <Grid item xs={12} sm={6} md={4} key={submission._id}>
              <Card constiant="outlined">
                <CardContent>
                  <Typography>
                    <span style={{ fontWeight: "bold" }}>id</span>:{" "}
                    {submission._id}
                  </Typography>
                  <Typography>
                    <span style={{ fontWeight: "bold" }}>Score</span>:{" "}
                    {submission.score}
                  </Typography>
                  <Typography>
                    <span style={{ fontWeight: "bold" }}>Message</span>:{" "}
                    {submission.feedback}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default FeedbackMessages;
