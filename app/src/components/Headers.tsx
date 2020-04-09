import React, { FC } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

export const Header: FC = () => {
  return (
    <>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          質問できます
        </Typography>
      </Toolbar>
    </AppBar>
    </>
  );
}
