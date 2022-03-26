import React from "react";
import { calculateNPS } from "../../utils";
import { NPSmarks } from "../../utils/constants";
import { StyledSlider, TitleText } from "../StyledComponents";

const NPSScore = ({ scores }) => {
  return (
    <>
      <TitleText data-testid="title-text">Your NPS Score</TitleText>
      <div style={{ padding: "20px" }}>
        <StyledSlider
          data-testid="nps-slider"
          defaultValue={calculateNPS(scores).nps}
          disabled={true}
          marks={NPSmarks}
          max={100}
          min={-100}
          steps={200}
          valueLabelDisplay="on"
        />
      </div>
    </>
  );
};

export default NPSScore;
