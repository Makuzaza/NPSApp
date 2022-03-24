import React from "react";
import ReactDom from "react-dom";
import Voted from "../Voted";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("<Voted/> Component", () => {
  it("<Voted/> renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Voted />, div);
  });

  it("<Voted/> renders Correctly", () => {
    const { container } = render(<Voted />);
    expect(container).toHaveTextContent(
      "Voted"
    );
  });
});
