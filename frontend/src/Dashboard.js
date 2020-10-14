import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Content from "./Content";
import SidebarDrawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SidebarDrawer/>
      <Content/>
    </div>
  );
}
