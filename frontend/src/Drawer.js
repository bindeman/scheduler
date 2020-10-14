import React, {useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItems from "./Sidebar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import globalSealLogo from "./img/globalSealLogo.png";
import globalCRED from "./img/globalCRED.svg";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";


const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({

  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: "auto",
    //marginBottom: "-12px",
    padding: '0 0',

    ...theme.mixins.toolbar,
  },
  appBar: {
    justifyContent: "center",
    backgroundColor: "white",
    padding: "10px",
    boxShadow: " 0 0 23px rgba(0,0,0,0.15)",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width', 'opacity', 'transform'], {
      easing: theme.transitions.easing.sharp,
      duration: "0.33s",
      //delay: "0.1s"
    }),
  },
  appBarShift: {
    //width: `calc(100% - ${103}px)`,
    //marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width', 'opacity', 'transform'], {
      easing: theme.transitions.easing.easeOut,
      duration: "0.33s",
      delay: "0.1s"
    }),
  },
  appBarHidden: {
    transform: "translate(0, -60px)",
    opacity: 0,
    transition: theme.transitions.create(['transform', 'opacity'], {
      easing: theme.transitions.easing.easeOut,
      duration: "0.33s",
    }),

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
    position: 'relative',
    overflowX: 'hidden',
    boxShadow: " 0 0 23px rgba(0,0,0,0.10)",
    width: "260px",
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
    width: "10px",
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
  appbarLogo: {
    margin: "auto",
    display: "block",
    maxWidth: "40px",
    height: "auto",
    position: "relative"
  },
  addMargin: {
    marginTop: "50px",
  },


}));

export default function SidebarDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [openMobile, setOpenMobile] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenMobile(!openMobile);
  }

  const handleDrawerClose = () => {
    setOpenMobile(false);
  }

  useEffect(() => {
    function handleResize() {
      if(window.innerWidth < 600) {
        setOpen(0)
      }
      else if(window.innerWidth < 720 && window.innerWidth > 600) {
        setOpen(1);
      }
      else {
        setOpen(2);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);

  }, []); // Empty array ensures that effect is only run on mount


  return (
      <React.Fragment>
      <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: openMobile,
            }, open !== 0 && classes.appBarHidden,
            )}
        >
          <Toolbar>
            <Grid container>
              <Grid item xs={1}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
              </Grid>
              <Grid item xs={10}>
            <img src={globalSealLogo}  className={classes.appbarLogo} alt={"Global Seal Logo"}/>
              </Grid>
              <Grid item xs={1}>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
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

        <div className={classes.toolbarIcon}>
          {/*<IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>*/}
          {/*  <MenuIcon />*/}
          {/*</IconButton>*/}
        </div>

      </Drawer>
      </React.Fragment>

  );
}
