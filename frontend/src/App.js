import React, { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Home from "./Views/Home/Home";
import Admin from "./Views/Admin/Admin";
import Navbar from "./Components/Navbar/Navbar";
import { useAuth } from "./utils";
import { Button } from "@material-ui/core";
import Login from "./Components/Login/Login";
import { iframeCode } from "./utils/constants";
import SharedDialog from "./Components/Dialog/SharedDialog";

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ||
    localStorage.getItem("auth") === "RrcAgaeyt3f7CxdGbF5GqNmd2NTH3NM7" ? (
    <Button
      onClick={() => {
        auth.signout(() => {
          history.push("/");
          localStorage.removeItem("auth");
          window.location.reload();
        });
      }}
    >
      Sign out
    </Button>
  ) : null;
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ||
        localStorage.getItem("auth") === "RrcAgaeyt3f7CxdGbF5GqNmd2NTH3NM7" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  const [embeddMode, setEmbeddMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitterId, setSubmitterId] = useState(null);
  const closeDialog = () => {
    setOpen(false);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(iframeCode);
    setOpen(false);
  };
  const submitedContent = (
    <>
      Your feedback has been given the id "
      <span style={{ color: "blue", fontWeight: "bold" }}>{submitterId}</span>"
      to maintain anonymity because of GDPR rule.
    </>
  );
  const embeddContent = <code>{iframeCode}</code>;
  return (
    <div style={{ paddingTop: "60px" }}>
      <Navbar setEmbeddMode={setEmbeddMode} setOpen={setOpen}>
        <AuthButton />
      </Navbar>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
        <Route path="/">
          <Home setOpen={setOpen} setSubmitterId={setSubmitterId} />
        </Route>
      </Switch>
      <SharedDialog
        submitterId={submitterId}
        closeDialog={closeDialog}
        open={open}
        embeddMode={embeddMode}
        handleCopy={handleCopy}
      >
        {embeddMode ? embeddContent : submitedContent}
      </SharedDialog>
    </div>
  );
}

export default App;
