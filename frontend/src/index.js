import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { authContext } from "./utils/index";

import App from "./App";

let url;
if (process.env.NODE_ENV === "production") {
  url = "/graphql";
} else {
  console.log("poop");
  url = "http://localhost:4000/graphql";
}

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("access_token");

  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: url,
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 10); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 10);
  },
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (authenticate) => {
    return fakeAuth.signin(() => {
      setUser("user");
      authenticate();
    });
  };

  const signout = (authenticate) => {
    return fakeAuth.signout(() => {
      setUser(null);

      authenticate();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

ReactDOM.render(
  <ProvideAuth>
    <HashRouter>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </HashRouter>
  </ProvideAuth>,
  document.getElementById("root")
);
