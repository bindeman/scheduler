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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
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
        zIndex: theme.zIndex.drawer - 1,
        transition: theme.transitions.create(['margin', 'width', 'opacity', 'transform'], {
            easing: theme.transitions.easing.sharp,
            duration: "0.33s",
            //delay: "0.1s"
        }),
    },
    appBarShift: {
        width: `calc(100% - ${103}px)`,
        marginLeft: 103,
        zIndex: theme.zIndex.drawer - 1,
        transition: theme.transitions.create(['margin', 'width', 'opacity', 'transform'], {
            easing: theme.transitions.easing.sharp,
            duration: "0.33s",
            //delay: "0.1s"
        }),
    },
    appBarHidden: {
        transform: "translate(0, -100px)",
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

    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    appbarLogo: {
        margin: "auto",
        display: "block",
        maxWidth: "40px",
        height: "auto",
        position: "relative"
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
        {/*<Slide in={props.open === 0} out={props.open !== 0} timeout={500}>*/}
        <HideOnScroll open={props.open} {...props}>

          <AppBar
              position="fixed"
              className={clsx(props.open !== 0 && classes.appBarHidden, classes.appBar, {
                      [classes.appBarShift]: props.openMobile,
                  }
              )}
          >

            <Toolbar>
                <Grid container>
                    <Grid item xs={1}>
                        <IconButton
                            color="inherit"
                            aria-label="Change Drawer"
                            onClick={props.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, props.open && classes.hide)}
                        >
                            {props.openMobile ? (<ChevronLeftIcon/>) : (<MenuIcon />)}
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
        {/*</Slide>*/}
      </React.Fragment>

  );
}
