import React, {useContext} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItems from "./Sidebar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import globalSealLogo from "../img/globalSealLogo.png";
import globalCRED from "../img/globalCRED.svg";
import HideAppBar from "../AppBar";
import {WidthContext} from "../WidthContext";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const useStyles = makeStyles((theme) => ({

  bottomContent: {
    display: 'flex',
    alignItems: 'center',
    height: "10px",
    marginLeft: "auto",
    //marginBottom: "-12px",
    padding: '0 0',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "grey",
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    display: "none"
  },
  drawerPaper: {
    position: 'sticky',
    height: '100vh',
    display: "flex",
    overflowX: 'hidden',
    boxShadow: " 0 0 23px rgba(0,0,0,0.10)",
    width: "260px",
    justifyContent: "space-between",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: "0.33s",

    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    display: 'relative',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: "0.33s",
      delay: "0.1s"
    }),
    width: "103px",
  },
  drawerPaperMobile: {
    paddingTop: "50px",
    overflowX: 'hidden',
    display: 'relative',
    transition: theme.transitions.create(['width', 'padding'],  {
      easing: theme.transitions.easing.sharp,
      duration: "0.33s",
    }),
    width: "1px",
  },
  drawerPaperMobileOpen: {
    overflowX: 'hidden',
    //display: "none",
    position: 'fixed',
    transition: theme.transitions.create(['width', 'padding'], {
      easing: theme.transitions.easing.sharp,
      duration: "0.33s",
    }),
    width: "103px",
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
  logoHidden: {
    // transform: "translate(0, -100px)",
    transition: "0.25s linear",
    opacity: 0
    //width: 0,
    //height: 0,
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
    //display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    //overflowY: "none",
    //height: "100%",
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
  // appbarLogo: {
  //   margin: "auto",
  //   display: "block",
  //   maxWidth: "40px",
  //   height: "auto",
  //   position: "relative"
  // },
  addMargin: {
    marginTop: "50px",
  },


}));

export default function SidebarDrawer() {
  const classes = useStyles();
  const {open} = useContext(WidthContext);

  const [openMobile, setOpenMobile] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpenMobile(!openMobile);
  }

  const handleDrawerClose = () => {
    setOpenMobile(false);
  }

  return (
      <React.Fragment>
      <CssBaseline />

        {open === 0 &&
        <HideAppBar
          openMobile={openMobile}
          open={open}
          handleDrawerOpen={handleDrawerOpen}
        />}

        <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleDrawerClose}
        >
      <Drawer
        variant={"permanent"}
        classes={{
          paper: clsx(classes.drawerPaper,
                  (open === 1 || open === 0) && classes.drawerPaperClose,
                   open === 0 && !openMobile && classes.drawerPaperMobile,
                   open === 0 && openMobile && classes.drawerPaperMobileOpen),
        }}
        open={open === 2}
      >
        {/*<Fade in={open !== 0} out={open === 0}>*/}
        <List className={clsx( open === 2 && classes.logo,
                              open === 0 && classes.logoHidden,
                              classes.logoClosed)}>

        <ListItem>
          <ListItemIcon>
            <div className={clsx( open === 2 && classes.listItemIconContainer, classes.listItemIconContainerClosed)}>
            <img alt="Global Seal Logo" className={classes.listItemIcon} src={globalSealLogo}/>
            </div>
          </ListItemIcon>
            <img className={clsx( (open === 1 || open === 0) && classes.textLogo, classes.textLogoClosed)} alt="Global C.R.E.D. Logo" src={globalCRED}/>
        </ListItem>
        </List>
        {/*</Fade>*/}

        <div className={classes.centered}>
        <ListItems
        drawerOpen={open}
        openMobile={openMobile}
        />
        </div>

        <div className={classes.bottomContent}>
        </div>

      </Drawer>
      </ClickAwayListener>
      </React.Fragment>

  );
}
