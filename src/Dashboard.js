import React from 'react';
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
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import Events from './Events';
import ListItems from "./ListItems";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import globalSealLogo from "./img/globalSealLogo.png";
import ListItemText from "@material-ui/core/ListItemText";
import globalCRED from "./img/globalCRED.svg";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Chart from './Chart';


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
    marginBottom: "-12px",
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
    position: 'relative',
    //whiteSpace: 'wrap',
    boxShadow: " 0 0 23px rgba(0,0,0,0.10);",
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'auto',
    //whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(10),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(10),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: "#F4F4F4"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: "500px",
    margin: "auto"
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 270,
  },
  logo: {
    alignSelf: "flex-start",
    //margin: "auto",
    //transform: "scale(1.3)",
    transform: "scale(1.15) translate(30px, 35px)",
    transition: "0.20s ease-in-out",
    //transition: "0.25s"

  },
  logoClosed: {
    //transform: "scale(0.9)",
    transition: "0.20s ease-in-out",
    //animationTimingFunction: "ease-in-out",
  },

  listItemIcon: {
    width: "48px",
    fontWeight: 700

  },
  centered: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%"
  },
  heroTitle: {
    fontSize: "23px",
    textTransform: "uppercase",
    fontWeight: 800,
    color: "#1C5100",
    letterSpacing: "-0.57px",
    lineHeight: "23px",
    textAlign: "left",
    maxWidth: "350px"
  },
  events: {
    maxWidth: "500px",
    margin: "auto"
  },
  textLogo: {
    opacity: "0%",
    transition: "0.25s",
    //animationTimingFunction: "ease-in-out"
  },
  textLogoClosed: {
    //opacity: "0%"
    transition: "0.25s",
    //animationTimingFunction: "ease-in-out"
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <List className={clsx( open && classes.logo, classes.logoClosed)}>
        <ListItem className={classes.listItem}>
          <ListItemIcon>
            <img className={classes.listItemIcon} src={globalSealLogo}/>
          </ListItemIcon>
            <img className={clsx( !open && classes.textLogo, classes.textLogoClosed)} src={globalCRED}/>
        </ListItem>
        </List>

        <div className={classes.centered}>
        <ListItems/>
        </div>

        <div className={classes.toolbarIcon}>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </div>

      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>

          <Grid container spacing={3}>

            <Grid item xs={12}>
              <Typography className={classes.heroTitle}>Event Schedule for Language Learners</Typography>
            </Grid>

            <Grid item xs={12}>
              <BrowserRouter>
                <div>
                  <Switch>
                    <Route path="/" component={Events} exact/>
                    <Route path="/list" component={Chart} exact/>
                    <Route path="/" component={Events} exact/>
                  </Switch>
                </div>
              </BrowserRouter>


            </Grid>

          </Grid>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
