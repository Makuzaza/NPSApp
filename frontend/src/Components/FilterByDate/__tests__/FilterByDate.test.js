import React from "react";
import ReactDOM from "react-dom";
import FilterByDate from "../FilterByDate";
import { cleanup, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("<FilterByDate/> Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FilterByDate />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders correctly", () => {
    const baseProps = {
      setFilterDate: jest.fn(),
      filterDate: new Date(),
    };
    const { container } = render(<FilterByDate {...baseProps} />);
    const date = new Date();
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: date } });
    expect(baseProps.setFilterDate).toHaveBeenCalledTimes(1);
    expect(baseProps.filterDate.toLocaleDateString()).toEqual(
      date.toLocaleDateString()
    );
  });
});
