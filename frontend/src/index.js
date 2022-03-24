import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { authContext } from "./utils/index";

import App from "./App";

let url;
if (process.env.NODE_ENV === "production") {
  console.log("peep");
  url = "/graphql";
} else {
  console.log("poop");
  url = "http://localhost:4000/graphql";
}

console.log(url);
const apolloClient = new ApolloClient({
  uri: url,
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
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </ProvideAuth>,
  document.getElementById("root")
);