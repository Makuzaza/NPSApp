import React from "react";
import ReactDOM from "react-dom";
import SharedDialog from "../SharedDialog";
import { cleanup, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { iframeCode } from "../../../utils/constants";

beforeEach(() => {
  let clipboardData = iframeCode; 
  const mockClipboard = {
    writeText: jest.fn((data) => {
      clipboardData = data;
    }),
    readText: jest.fn(() => {
      return clipboardData;
    }),
  };
  global.navigator.clipboard = mockClipboard;
});

afterEach(cleanup);


describe("<SharedDialog/> Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SharedDialog open={true} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Dialog Header ", () => {
    const { getByTestId } = render(<SharedDialog open={true} />);
    const dialogHeader = getByTestId("dialog-header");
    expect(dialogHeader).toHaveTextContent("Thank you!");
  });

  it("Copy btn fn", () => {
    const { getByTestId } = render(
      <SharedDialog open={true} embeddMode={true} />
    );
    const copyBtn = getByTestId("copy-btn");
    expect(copyBtn).toBeInTheDocument();

    fireEvent.click(copyBtn)
    expect(navigator.clipboard.readText()).toEqual(iframeCode);
  });
});
