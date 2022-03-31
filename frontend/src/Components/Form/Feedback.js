import React from 'react';
import { TextField, Typography } from '@material-ui/core';

const Feedback = ({ feedback, handleChange }) => {
  return (
    <div style={{ margin: '40px 0' }}>
      <Typography
        style={{ margin: '20px 0', fontFamily: "'Alata', sans-serif" }}
      >
        Please provide any comments to help explain your selection
      </Typography>
      <TextField
        value={feedback}
        onChange={handleChange}
        id="outlined-basic"
        label="Feedback"
        variant="outlined"
        multiline
        placeholder="Please provide any comments to help explain your selection"
        fullWidth
        rows={10}
      />
    </div>
  );
};

export default Feedback;
