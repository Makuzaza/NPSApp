import React from 'react'

import { TitleText, SubtitleText } from "../StyledComponents";

const HomeInfo = () => {
  return (
    <div data-testid="home-info">
      <TitleText>
        I would like some feedback from you
        <span role="img" aria-label="">
          &#129488;
        </span>
      </TitleText>
      <SubtitleText>
        Your submission will be completely anonymous because of GDPR rule
        <span role="img" aria-label="">
          &#129323;
        </span>
      </SubtitleText>
    </div>
  );
};

export default HomeInfo;