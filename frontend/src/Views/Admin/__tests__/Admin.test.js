import React from "react";
import ReactDOM from "react-dom";
import Admin from "../Admin";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter,MemoryRouter } from "react-router-dom";
import { enableFetchMocks } from "jest-fetch-mock";
import { GET_SUBMISSIONS } from "../../../utils/graphql";
import { calculateNPS } from "../../../utils";
import { act } from "react-dom/test-utils";

afterEach(cleanup);

let url;
let scores;

beforeEach(() => {
  url = "http://localhost:4000/graphql";
  enableFetchMocks();
  scores = [
    {
      _id: "623640bbd4da15371055d9ac",
      score: 10,
      created_at: "1646336684065",
      feedback: "wow!",
      __typename: "SubmissionType",
    },
    {
      _id: "6236467f94a9836e2fd39cdc",
      score: 4,
      created_at: "1647722684065",
      feedback: "wow!",
      __typename: "SubmissionType",
    },
    {
      _id: "623653d994a9836e2fd39cdd",
      score: 3,
      created_at: "1647722684065",
      feedback: "wow!",
      __typename: "SubmissionType",
    },
  ];
});

const apolloClient = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});
const ConfirgedComponent = () => (
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Admin />
    </ApolloProvider>
  </BrowserRouter>
);

describe("<Admin/> Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ConfirgedComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders correctly", async () => {
    await act(async () => {
      const { getByTestId } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: GET_SUBMISSIONS,
              },
              result: {
                data: { getAllSubmissions: scores },
              },
            },
          ]}
          addTypename={false}
        >
          <MemoryRouter initialEntries={["/admin/"]}>
            <Admin />
          </MemoryRouter>
        </MockedProvider>
      );
      expect(getByTestId("loading-box")).toBeInTheDocument();
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(getByTestId("nps-slider")).toHaveTextContent(calculateNPS(scores).nps);
    });
  });
});
