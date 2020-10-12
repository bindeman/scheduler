import React, {useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import Events from './Events';
import ListItems from "./Sidebar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import globalSealLogo from "./img/globalSealLogo.png";
import globalCRED from "./img/globalCRED.svg";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Chart from './Chart';
import Content from "./Content";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © ${new Date().getFullYear()} `}
      <Link color="inherit" href="http://theglobalseal.com">
        The Global Seal.
      </Link>{' '}

      {'All rights reserved.'}
    </Typography>
  );
}



const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //marginBottom: "-12px",
    padding: '0 0',

    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    zIndex: 9999,
    position: 'relative',
    overflowX: 'hidden',
    boxShadow: " 0 0 23px rgba(0,0,0,0.10);",
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: "0.33s",

    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: "0.33s",
      delay: "0.1s"
    }),
    width: "103px",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    position: "relative",
    overflow: 'auto',
    backgroundColor: "#F4F4F4",
    padding: "12px"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: "500px",
    minHeight: "100%",
    margin: "auto",
    display: "flex",
    //justifyContent: "space-evenly"
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  logo: {
    transform: "translate(20px, 20px)",
    transition: "0.25s ease-in-out",
    marginBottom: "30px"

  },
  logoClosed: {
    width: "100%",
    marginLeft: "8px",
    transition: "0.25s ease-in",
    marginTop: "10px",
  },
  listItemIconContainer: {
    transform: "scale(1.17)",
    height: "auto",
    fontWeight: 700,
    transition: "0.25s ease-in-out"
  },
  listItemIconContainerClosed: {
    width: "54px",
    height: "auto",
    transition: "0.25s ease-in-out"
  },
  listItemIcon: {
    width: "100%"
  },
  centered: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  events: {
    maxWidth: "500px",
    margin: "auto"
  },
  textLogo: {
    opacity: "0%",
    transition: "0.25s",
    transitionDelay: "0.0s",
    position: "relative",
  },
  textLogoClosed: {
    //transitionDelay: "0.1s",
    transition: "0.25s",
    paddingLeft: "11px",
    paddingBottom: "3px"
  },
  contentGrid: {
    display: "flex",
    justifyContent: "space-evenly"
  }
}));




export default function SidebarDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setOpen(window.innerWidth < 720 ? false : true);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);

  }, []); // Empty array ensures that effect is only run on mount


  return (
      <React.Fragment>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <List className={clsx( open && classes.logo, classes.logoClosed)}>

        <ListItem>
          <ListItemIcon>
            <div className={clsx( open && classes.listItemIconContainer, classes.listItemIconContainerClosed)}>
            <img alt="Global Seal Logo" className={classes.listItemIcon} src={globalSealLogo}/>
            </div>
          </ListItemIcon>
            <img className={clsx( !open && classes.textLogo, classes.textLogoClosed)} alt="Global C.R.E.D. Logo" src={globalCRED}/>
        </ListItem>
        </List>

        <div className={classes.centered}>
        <ListItems
        drawerOpen={open}
        />
        </div>

        <div className={classes.toolbarIcon}>
          {/*<IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>*/}
          {/*  <MenuIcon />*/}
          {/*</IconButton>*/}
        </div>

      </Drawer>
      </React.Fragment>

  );
}
