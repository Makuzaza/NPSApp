import React from "react";
import {
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Code } from "@material-ui/icons";


const EmbeddWidget = ({ setEmbeddMode, setOpen }) => {
  const handleClick = () => {
    setEmbeddMode(true);
    setOpen(true)
  }
  return (
    <Tooltip title="Copy iframe">
      <IconButton
        style={{ margin: "0 30px" }}
        component={Button}
        onClick={handleClick}
        color="inherit"
      >
        <Code/>
      </IconButton>
    </Tooltip>
  );
};

export default EmbeddWidget;
