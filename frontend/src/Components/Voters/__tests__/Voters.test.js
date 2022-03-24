import React from "react";
import ReactDOM from "react-dom";
import Voters from "../Voters";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";


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

describe("<Voters/> Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Voters data={scores} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders correctly ", () => {
    const { getByTestId } = render(<Voters data={scores}/>);
    const scoresGrid = getByTestId("voters-grid");
    expect(scoresGrid.children.length).toEqual(3);
    expect(scoresGrid.children[0].textContent).toEqual(
      "Id: 623640bbd4da15371055d9ac"
    );
  });
});
