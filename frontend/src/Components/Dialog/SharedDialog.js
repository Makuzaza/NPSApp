import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { DialogHeader } from "../StyledComponents";
const SharedDialog = ({
  open,
  closeDialog,
  embeddMode,
  handleCopy,
  children,
}) => {
  return (
    <Dialog open={open} onClose={closeDialog} data-testid="dialog">
      <DialogTitle>
        <DialogHeader data-testid="dialog-header">Thank you!</DialogHeader>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ fontFamily: "'Alata', sans-serif" }}>
          {children}
        </DialogContentText>
      </DialogContent>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {embeddMode && (
          <DialogActions>
            <Button
              color="primary"
              onClick={handleCopy}
              variant="outlined"
              data-testid="copy-btn"
            >
              Copy
            </Button>
          </DialogActions>
        )}
        <DialogActions data-testid="close-btn">
          <Button color="primary" onClick={closeDialog} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default SharedDialog;
