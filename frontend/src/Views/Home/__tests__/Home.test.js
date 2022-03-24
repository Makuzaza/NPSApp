import React from "react";
import ReactDOM from "react-dom";
import Home from "../Home";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { enableFetchMocks } from "jest-fetch-mock";
import { act } from "react-dom/test-utils";


afterEach(cleanup);

let url;

beforeEach(() => {
  url = "http://localhost:4000/graphql";
  enableFetchMocks();
});

const apolloClient = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});
const ConfirgedComponent = () => (
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Home />
    </ApolloProvider>
  </BrowserRouter>
);

describe("<Home/> Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ConfirgedComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders correctly", async () => {
    await act(async () => {
      const { getByTestId } = render(<ConfirgedComponent />);
      expect(getByTestId("home-page")).toHaveTextContent("Submit");
    });
  });
});
