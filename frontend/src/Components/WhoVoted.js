import React from 'react';
import { TitleText } from './StyledComponents';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

const Voters = ({ data }) => {
  return (
    <div style={{ margin: '30px 0 ' }}>
      <TitleText>Voters</TitleText>
      <div style={{ margin: '30px 0 ' }}>
        <Grid container spacing={3}>
          {data.map((submission) => (
            <Grid item xs={6} sm={4} key={submission._id}>
              <Card constiant="outlined">
                <CardContent>
                  <Typography>Id: {submission._id}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Voters;
