import React from 'react'
import { VotedLabel } from "../StyledComponents";
import { CheckCircleOutlined } from '@material-ui/icons';

const Voted = () => {
  return (
    <VotedLabel>
      <CheckCircleOutlined fontSize='large'/> Voted
    </VotedLabel>
  );
}

export default Voted