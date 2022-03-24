import React from 'react'
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { TitleText } from '../StyledComponents';

const Scores = ({ submissions }) => {
  return (
    <>
      <TitleText>Responses</TitleText>
      <Grid container spacing={3} data-testid="scores-grid">
        {submissions.map((submission) => (
          <Grid item xs={6} sm={4} key={submission._id}>
            <Card constiant="outlined">
              <CardContent>
                <Typography>Score: {submission.score}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Scores