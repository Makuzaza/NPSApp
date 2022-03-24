import React from "react";
import ReactDOM from "react-dom";
import Login from "../Login";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { enableFetchMocks } from "jest-fetch-mock";
import { AUTHENTICATE_USER } from "../../../utils/graphql";

afterEach(cleanup);

let url;

beforeEach(() => {
  url = "http://localhost:4000/graphql";
  enableFetchMocks();
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/login",
  }),
}));

const apolloClient = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});
const ConfirgedComponent = (props) => (
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Login {...props} />
    </ApolloProvider>
  </BrowserRouter>
);

describe("<Login/> Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    act(() => {
      ReactDOM.render(<ConfirgedComponent />, div);
    });

    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders correctly", async () => {
    await act(async () => {
      const { getByTestId } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: AUTHENTICATE_USER,
                variables: {
                  username: "admin",
                  password: "12345",
                },
              },
              result: {
                data: {
                  authenticateUser: true,
                },
              },
            },
          ]}
          addTypename={false}
        >
          <Login />
        </MockedProvider>
      );
      const username = getByTestId("usernameField").querySelector("input");
      const password = getByTestId("passwordField").querySelector("input");
      fireEvent.change(username, { target: { value: "admin" } });
      fireEvent.change(password, { target: { value: "12345" } });
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(username.value).toEqual("admin");
      expect(password.value).toEqual("12345");
    });
  });
});
