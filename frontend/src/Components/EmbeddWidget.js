import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { Code } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
const HeaderText = withStyles({
  root: {
    'font-family': "'Alata', sans-serif",
    'font-size': '1.5rem',
    margin: '40px 0px 40px 0px',
  },
})(Typography);
const EmbeddWidget = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  const iframeCode = ` <iframe
      width="100%"
      height="100%"
      src="http://localhost:3000"
      title="NPSApp"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>`;
  const handleCopy = () => {
    navigator.clipboard.writeText(iframeCode);
    setOpen(false);
  };
  return (
    <>
      <Tooltip title="Copy iframe">
        <IconButton
          style={{ margin: '0 30px' }}
          component={Button}
          onClick={handleClick}
        >
          <Code />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>
          <HeaderText>Embed Site</HeaderText>
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontFamily: "'Alata', sans-serif" }}>
            <code>{iframeCode}</code>
          </DialogContentText>
        </DialogContent>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogActions>
            <Button color="primary" onClick={handleCopy} variant="outlined">
              Copy
            </Button>
          </DialogActions>
          <DialogActions>
            <Button color="primary" onClick={closeDialog} variant="outlined">
              Close
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default EmbeddWidget;
