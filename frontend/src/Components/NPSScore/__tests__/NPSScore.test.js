import React from "react";
import ReactDOM from "react-dom";
import NPSScore from "../NPSScore";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { calculateNPS } from "../../../utils";

let scores;

beforeEach(() => {
  scores = [
    {
      _id: "623640bbd4da15371055d9ac",
      score: 10,
      created_at: "1646336684065",
      __typename: "SubmissionType",
    },
    {
      _id: "6236467f94a9836e2fd39cdc",
      score: 4,
      created_at: "1647722684065",
      __typename: "SubmissionType",
    },
    {
      _id: "623653d994a9836e2fd39cdd",
      score: 3,
      created_at: "1647722684065",
      __typename: "SubmissionType",
    },
  ];
});

afterEach(cleanup);

describe("<NPSScore/> Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<NPSScore scores={scores} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Title text ", () => {
    const { getByTestId } = render(<NPSScore scores={scores} />);
    const titleText = getByTestId("title-text");
    expect(titleText).toHaveTextContent("Your NPS Score");
  });
  it("Got the correct value text", () => {
    const score = calculateNPS(scores)
    const { container } = render(<NPSScore scores={scores} />);
    const input = container.querySelector("input");
    expect(+input.value).toEqual(score);
  });
});
