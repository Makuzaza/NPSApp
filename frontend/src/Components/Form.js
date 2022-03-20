import React from 'react';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { gql, useMutation } from '@apollo/client';

import { FormButton, StyledSlider, TitleText } from './StyledComponents';
import Voted from './Voted';

/*
  Styles
*/
const HeaderText = withStyles({
  root: {
    'font-family': "'Alata', sans-serif",
    'font-size': '1.5rem',
    margin: '40px 0px 40px 0px',
  },
})(Typography);

const SubtitleText = withStyles({
  root: {
    'font-family': "'Alata', sans-serif",
    'font-size': '1.4rem',
    color: 'lightgrey',
  },
})(Typography);

/*
  GraphQL
*/
const CREATE_SUBMISSION = gql`
  mutation createSubmission($score: Int!) {
    createSubmission(score: $score) {
      _id
      score
    }
  }
`;

/*
  Component
*/
export default function Form() {
  const [open, setOpen] = React.useState(false);
  const [score, setScore] = React.useState(10);
  const [voted, setVoted] = React.useState(false);
  const [submitterId, setSubmitterId] = React.useState(null);

  // eslint-disable-next-line
  const [createSubmission, { data }] = useMutation(CREATE_SUBMISSION);

  const marks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 1,
      label: 1,
    },
    {
      value: 2,
      label: 2,
    },
    {
      value: 3,
      label: 3,
    },
    {
      value: 4,
      label: 4,
    },
    {
      value: 5,
      label: 5,
    },
    {
      value: 6,
      label: 6,
    },
    {
      value: 7,
      label: 7,
    },
    {
      value: 8,
      label: 8,
    },
    {
      value: 9,
      label: 9,
    },
    {
      value: 10,
      label: 10,
    },
  ];
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const handleOnChange = (event, value) => {
    setScore(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createSubmission({
      variables: {
        score: score,
      },
    })
      .then((response) => {
        console.log('RESPONSE', response);
        var expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        document.cookie = `id=${
          response.data.createSubmission._id
        }; expires=${expiryDate.toGMTString()}`;
        setVoted(true);
        setSubmitterId(response.data.createSubmission._id);
      })
      .then(() => {
        setOpen(true);
      })
      .catch((error) => {
        console.log('ERROR: ', error);
      });
  };

  const closeDialog = () => {
    setOpen(false);
  };
  const content =
    getCookie('id') && voted ? (
      <Voted />
    ) : (
      <>
        {' '}
        <StyledSlider
          defaultValue={10}
          id="scoreField"
          marks={marks}
          max={10}
          min={0}
          onChange={handleOnChange}
          steps={10}
          valueLabelDisplay="on"
        />
        <div>
          <FormButton type="submit" color="primary" variant="contained">
            Submit
          </FormButton>
        </div>
      </>
    );
  React.useEffect(() => {
    setVoted(getCookie('id') ? true : false);
  }, [voted]);
  return (
    <Container>
      <TitleText>
        I would like some feedback from you{' '}
        <span role="img" aria-label="">
          &#129488;
        </span>
      </TitleText>
      <SubtitleText>
        Your submission will be completely anonymous because of GDPR rule{' '}
        <span role="img" aria-label="">
          &#129323;
        </span>
      </SubtitleText>
      <form onSubmit={handleSubmit}>
        <HeaderText>
          On a scale of 0 to 10, how likely are you to recommend Santosh Kalwar
          as Teacher?
        </HeaderText>
        {content}
      </form>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>
          <HeaderText>Thank you!</HeaderText>
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontFamily: "'Alata', sans-serif" }}>
            Your feedback has been given the id "
            <span style={{ color: 'blue', fontWeight: 'bold' }}>
              {submitterId}
            </span>
            " to maintain anonymity because of GDPR rule.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
