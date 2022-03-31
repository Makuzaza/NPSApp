import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { FormButton, HeaderText } from '../StyledComponents';
import VoteBar from './VoteBar';
import Feedback from './Feedback';
import { setCookie } from '../../utils';
import { CREATE_SUBMISSION } from '../../utils/graphql';

export default function Form({ setOpen, setVoted, setSubmitterId }) {
  const [score, setScore] = useState(10);
  const [feedback, setFeedback] = useState('');
  const [createSubmission] = useMutation(CREATE_SUBMISSION);

  const handleOnChange = (event, value) => {
    setScore(value);
  };
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createSubmission({
      variables: {
        score: score,
        feedback: feedback,
      },
    })
      .then((response) => {
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        setCookie(
          'id',
          response.data.createSubmission._id,
          expiryDate.toGMTString()
        );
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

  return (
    <form onSubmit={handleSubmit} data-testid="submit-form">
      <HeaderText>
        On a scale of 0 to 10, how likely are you to recommend Santosh Kalwar as
        Teacher?
      </HeaderText>
      <VoteBar score={score} handleOnChange={handleOnChange} />
      <Feedback feedback={feedback} handleChange={handleFeedbackChange} />
      <div>
        <FormButton
          type="submit"
          color="primary"
          variant="contained"
          data-testid="submit-bttn"
        >
          Submit
        </FormButton>
      </div>
    </form>
  );
}
