import React from "react";
import ReactDOM from "react-dom";
import FeedbackMessages from "../FeedbackMessages";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let scores;

beforeEach(() => {
  scores = [
    {
      _id: "623640bbd4da15371055d9ac",
      score: 10,
      created_at: "1646336684065",
      feedback: "nice!",
      __typename: "SubmissionType",
    },
    {
      _id: "6236467f94a9836e2fd39cdc",
      score: 4,
      created_at: "1647722684065",
      __typename: "SubmissionType",
      feedback: "nicee!",
    },
    {
      _id: "623653d994a9836e2fd39cdd",
      score: 3,
      created_at: "1647722684065",
      __typename: "SubmissionType",
      feedback: "niceee!",
    },
  ];
});

afterEach(cleanup);

describe("<Scores/> Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FeedbackMessages submissions={scores} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders correctly ", () => {
    const { getByTestId } = render(<FeedbackMessages submissions={scores} />);
    const scoresGrid = getByTestId("feedback-grid");
    expect(scoresGrid.children.length).toEqual(3);
    expect(scoresGrid.children[0]).toHaveTextContent("nice!");
    expect(scoresGrid.children[1]).toHaveTextContent("nicee");
    expect(scoresGrid.children[2]).toHaveTextContent("niceee!");
  });
});
