import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, TextField } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { LoginButton, TitleText } from "../StyledComponents";
import { useAuth } from "../../utils/index";
import { AUTHENTICATE_USER } from "../../utils/graphql";



export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const [usernameString, setUsernameString] = useState(null);
  const [passwordString, setPasswordString] = useState(null);
  const [inputError, setInputError] = useState(false);
  const [authenticateUser] = useMutation(AUTHENTICATE_USER);

  const { from } = location.state || { from: { pathname: "/" } };

  const login = (event) => {
    authenticateUser({
      variables: { username: usernameString, password: passwordString },
    })
      .then((response) => {
        if (response.data.authenticateUser.success) {
          auth.signin(() => {
            history.replace(from);
            localStorage.setItem(
              "access_token",
              response.data.authenticateUser.access_token
            );
          });
        } else {
          setInputError(true);
        }
      })
      .catch((error) => {
        setInputError(true);
      });
  };

  const handleTextChange = (event) => {
    switch (event.target.id) {
      case "usernameField":
        setUsernameString(event.target.value);
        break;
      case "passwordField":
        setPasswordString(event.target.value);
        break;
      default:
        console.log("ERROR: No input given!");
    }
  };

  return (
    <Container style={{ width: "30rem" }}>
      <TitleText>Please log in to continue:</TitleText>
      <form>
        <TextField
          id="usernameField"
          error={inputError}
          fullWidth={true}
          label="Username"
          onChange={handleTextChange}
          style={{ marginTop: "1.5rem" }}
          variant="outlined"
          data-testid="usernameField"
        />
        <br />
        <TextField
          id="passwordField"
          error={inputError}
          fullWidth={true}
          label="Password"
          onChange={handleTextChange}
          style={{ marginTop: "1.5rem" }}
          variant="outlined"
          type="password"
          data-testid="passwordField"
        />
      </form>
      <LoginButton onClick={login} variant="outlined">
        Log in
      </LoginButton>
    </Container>
  );
}
