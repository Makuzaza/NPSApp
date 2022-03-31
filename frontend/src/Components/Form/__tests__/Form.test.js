import React from "react";
import ReactDOM from "react-dom";
import Form from "../Form";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { enableFetchMocks } from "jest-fetch-mock";
import { CREATE_SUBMISSION } from "../../../utils/graphql";

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
const ConfirgedComponent = (props) => (
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Form {...props} />
    </ApolloProvider>
  </BrowserRouter>
);

describe("<Form/> Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    act(() => {
      ReactDOM.render(<ConfirgedComponent />, div);
    });

    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders correctly", async () => {
    const baseProps = {
      setOpen: jest.fn(),
      setVoted: jest.fn(),
      setSubmitterId: jest.fn(),
    };
    await act(async () => {
      const { container } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: CREATE_SUBMISSION,
                variables: {
                  score: 10,
                  feedback: "",
                },
              },
              result: {
                data: {
                  createSubmission: {
                    _id: "623badd43814e921ec86108f",
                    score: 10,
                    feedback: "",
                    __typename: "SubmissionType",
                  },
                },
              },
            },
          ]}
          addTypename={false}
        >
          <Form {...baseProps} />
        </MockedProvider>
      );
      const form = container.querySelector("form");
      fireEvent.submit(form);
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(container.querySelector("input").value).toEqual("10");
    });
  });
});
