import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

interface Message {
  from: "customer" | "company";
  text: string;
}

interface Props {
  messages: Message[];
}

const CompanyMessage: FC<{ text: string }> = ({ text }) => {
  return (
    <Grid container item spacing={1}>
      <Grid item xs={2}>
        <Avatar />
      </Grid>
      <Grid item xs={10}>
        <Paper component="span" elevation={3} style={{ padding: 12, display: "inline-block" }}>
        {text}
        </Paper>
      </Grid>
    </Grid>
  );
}

const CustomerMessage: FC<{ text: string }> = ({ text }) => {
  return (
    <Grid container item spacing={1}>
      <Grid item xs={10} style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Paper component="span" elevation={3} style={{ padding: 12, display: "inline-block" }}>
        {text}
        </Paper>
      </Grid>
      <Grid item xs={2} style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Avatar />
      </Grid>
    </Grid>
  );
}

export const Messages: FC<Props> = ({ messages }) => {
  return (
    <Grid container spacing={1}>
    {messages.map((message, i) => message.from === "customer"
      ? <CustomerMessage text={message.text} key={i} />
      : <CompanyMessage text={message.text} key={i} />)}
    </Grid>
  );
}
