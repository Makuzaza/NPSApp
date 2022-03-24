import React from 'react'
import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import { ChatBubble as HomeIcon } from "@material-ui/icons";
import EmbeddWidget from "../EmbeddWidget/EmbeddWidget";
import { Link } from 'react-router-dom';
const Navbar = ({ setEmbeddMode, children, setOpen }) => {
  return (
    <AppBar
      color="default"
      position="fixed"
      style={{ boxShadow: " 0 0 10px -6px #000" }}
    >
      <Toolbar>
        <IconButton edge="start" component={Link} to="/">
          <HomeIcon />
        </IconButton>
        <Button component={Link} to="/admin">
          Admin
        </Button>
        <EmbeddWidget setEmbeddMode={setEmbeddMode} setOpen={setOpen} />
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar