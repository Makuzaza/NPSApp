import React from "react";
import ReactDOM from "react-dom";
import Charts from "../Charts";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

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

describe("<Charts/> Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Charts />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders correctly", () => {
    const { getByTestId, container } = render(<Charts data={scores} />);
    expect(getByTestId("chart-title").textContent).toEqual("Vote Results");
    expect(
      container.querySelector(".recharts-cartesian-axis-ticks").children.length
    ).toEqual(3);
  });
});
