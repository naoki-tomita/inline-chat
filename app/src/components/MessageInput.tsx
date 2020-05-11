import React, { FC, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { collection, waitForResponse } from "../firebase/app";

export const MessegeInput: FC = () => {
  const [text, setState] = useState("");
  function send() {
    if (text) {
      collection.add({ text, from: "customer", time: Date.now() });
      waitForResponse();
      setState("");
    }
  }
  return (
    <AppBar position="fixed" color="primary" style={{ bottom: 0, top: "auto" }}>
      <Toolbar>
        <TextField
          InputProps={{ style: { backgroundColor: "#EEE" } }}
          color="primary"
          variant="outlined"
          size="small" fullWidth
          onChange={e => setState(e.target.value)}
          onKeyPress={e => e.key === "Enter" && send()}
          value={text}
        />
        <IconButton
          color="inherit"
          edge="end"
          onClick={send}
        >
          <SendIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
