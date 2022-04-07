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
import { Menu,ExitToApp } from "@material-ui/icons";
import Sidebar from "./Components/Navbar/Sidebar";

function AuthButton({ handleClick }) {
  let history = useHistory();
  let auth = useAuth();
  return auth.user ||
    localStorage.getItem("access_token")? (
    <div style={{ justifySelf: "flex-end" }}>
      <Button
        onClick={() => {
          auth.signout(() => {
            history.push("/");
            localStorage.removeItem("access_token");
            window.location.reload();
          });
        }}
      >
        <ExitToApp />
      </Button>

      <Button onClick={handleClick}>
        <Menu />
      </Button>
    </div>
  ) : null;
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ||
        localStorage.getItem("access_token")? (
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
  const [state, setState] = useState(false);
  const [submitterId, setSubmitterId] = useState(null);
  const closeDialog = () => {
    setOpen(false);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(iframeCode);
    setOpen(false);
  };

  const handleClick = () => {
    setState(true);
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
        <AuthButton handleClick={handleClick} />
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
      <Sidebar state={state} setState={setState}/>
    </div>
  );
}

export default App;
