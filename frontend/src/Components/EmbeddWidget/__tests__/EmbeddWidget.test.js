import React from "react";
import ReactDOM from "react-dom";
import EmbeddWidget from "../EmbeddWidget";

import { cleanup, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("<EmbeddWidget/> Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<EmbeddWidget />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders correctly", () => {
    const baseProps = {
      setEmbeddMode: jest.fn(),
      setOpen: jest.fn(),
    };
    const { container } = render(<EmbeddWidget {...baseProps} />);
    const btn = container.querySelector("button");
    fireEvent.click(btn);
    expect(baseProps.setEmbeddMode).toHaveBeenCalledTimes(1);
    expect(baseProps.setOpen).toHaveBeenCalledTimes(1);
  });
});
