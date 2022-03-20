import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';

import { gql, useQuery } from '@apollo/client';

import { StyledSlider, TitleText } from './StyledComponents';
import Calender from './Calender';
import Charts from './Charts';
import Voters from './WhoVoted';

/*
  GraphQL
*/
const GET_SUBMISSIONS = gql`
  query {
    getAllSubmissions {
      _id
      score
      created_at
    }
  }
`;

/*
  Component
*/
function calculateNPS(data) {
  let detractors = 0;
  // eslint-disable-next-line
  let passives = 0;
  let promoters = 0;
  let totalCount = 0;
  // eslint-disable-next-line
  data.getAllSubmissions.map((submission) => {
    if (submission.score <= 6) {
      detractors++;
    } else if (submission.score <= 8) {
      passives++;
    } else {
      promoters++;
    }
    totalCount++;
  });
  const npsScore = 100 * (promoters / totalCount - detractors / totalCount);
  return Math.ceil(npsScore);
}

const marks = [
  {
    value: -100,
    label: -100,
  },
  {
    value: 100,
    label: 100,
  },
];

export default function Admin() {
  const [filterDate, setFilterDate] = useState(null);
  const { loading, data } = useQuery(GET_SUBMISSIONS);

  if (loading) return 'Loading...';
  const submissions = !filterDate
    ? [...data.getAllSubmissions]
    : [
        ...data.getAllSubmissions.filter(
          (submission) => submission.created_at > filterDate.getTime()
        ),
      ];
  return (
    <Container>
      <TitleText>Your NPS Score</TitleText>
      <div style={{ padding: '20px' }}>
        <StyledSlider
          defaultValue={calculateNPS(data)}
          disabled={true}
          marks={marks}
          max={100}
          min={-100}
          steps={200}
          valueLabelDisplay="on"
        />
      </div>
      <TitleText>Filter By Date</TitleText>
      <Grid
        container
        spacing={5}
        style={{
          margin: '30px 0 40px',
        }}
      >
        <Calender setFilterDate={setFilterDate} filterDate={filterDate} />
      </Grid>

      <TitleText>Responses</TitleText>
      <Grid container spacing={3}>
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

      <Charts data={submissions} />
      <Voters data={submissions} />
    </Container>
  );
}
