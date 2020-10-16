import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import globalSealLogo from "./img/globalSealLogo.png";



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
        position: 'sticky',
        height: '100vh',
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


function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected to work in an iframe.
   */
  window: PropTypes.func,
};

export default function HideAppBar(props) {

    const classes = useStyles();

    return (
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                      [classes.appBarShift]: props.openMobile,
                  }, props.open !== 0 && classes.appBarHidden,
              )}
          >
            <Toolbar>
                <Grid container>
                    <Grid item xs={1}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={props.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, props.open && classes.hide)}
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
        </HideOnScroll>
      </React.Fragment>
  );
}
