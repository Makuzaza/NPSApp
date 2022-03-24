import React from "react";
import ReactDom from "react-dom";
import HomeInfo from "../HomeInfo";

import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("<HomeInfo/> Component", () => {
  it("<HomeInfo/> renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<HomeInfo />, div);
  });

  it("<HomeInfo/> renders Correctly", () => {
    const { getByTestId } = render(<HomeInfo />);
    expect(getByTestId("home-info")).toHaveTextContent(
      "I would like some feedback from you"
    );
    expect(getByTestId("home-info")).toHaveTextContent(
      "Your submission will be completely anonymous because of GDPR rule"
    );
  });
});
