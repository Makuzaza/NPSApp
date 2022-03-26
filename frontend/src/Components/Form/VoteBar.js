import React from "react";
import { StyledSlider } from "../StyledComponents";
import { marks } from "../../utils/constants";

const VoteBar = ({ handleOnChange, score }) => {
  return (
    <StyledSlider
      defaultValue={10}
      id="scoreField"
      marks={marks}
      max={10}
      min={0}
      onChange={handleOnChange}
      steps={10}
      valueLabelDisplay="on"
      data-testid="slider-change"
      value={score}
    />
  );
};

export default VoteBar;
