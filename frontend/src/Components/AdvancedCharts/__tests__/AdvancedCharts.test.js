import React from "react";
import ReactDOM from "react-dom";
import AdvancedCharts from "../AdvancedCharts";
import { cleanup, render } from "@testing-library/react";
import { formatSummary } from "../../../utils/index";
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

describe("<AdvancedCharts/> Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AdvancedCharts data={scores} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders correctly", () => {
    const { container } = render(<AdvancedCharts data={scores} />);
    const { final } = formatSummary(scores);
    expect(
      [...container.querySelectorAll(".recharts-cartesian-axis-ticks")][2]
        .children.length
    ).toEqual(final.length);
  });
});
