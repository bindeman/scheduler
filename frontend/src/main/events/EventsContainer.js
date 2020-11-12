import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Events from "./eventTypes/Events";
import Paper from "@material-ui/core/Paper";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {NavLink, Route, Switch, withRouter} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import PreReordedEvents from "./eventTypes/PreRecordedEvents";
import Grid from "@material-ui/core/Grid";
import PreRecordedEvents from "./eventTypes/PreRecordedEvents";
import {WidthContext} from "../../WidthContext";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        //backgroundColor: theme.palette.background.paper,
    },
    menuBar: {
        backgroundColor: '#ddd',
        position: 'fixed',
        background: "linear-gradient(to bottom, #1C5100 0%, #658546 100%)",
        maxWidth: '350px',
        paddingLeft: '25px',
        paddingRight: '25px',
        borderRadius: 30,
        boxShadow: '0 0 43px rgba(0,0,0,0.40)',
        zIndex: 1,
        bottom: 15,
    },
    tabs: {
        color: '#A9BC9B',
        fontWeight: 700,
        fontSize: 11,
        textTransform: 'none',
        '&:hover': {
            color: '#fff',
            opacity: 1,
        },
        '&$selected': {
            color: '#fff',
            //fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#fff',
        },
    },
    indicator: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingRight: '75px',
        width: 90,
    },
    text: {
        color: '#fff'
    }
}));

export default function EventsContainer(props) {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
                <Paper className={classes.menuBar}>
                <Tabs className={classes.tabs} classes={{text: classes.text, indicator: classes.indicator}

                }
                    value={value}
                    onChange={handleChange}
                      inkBarStyle={{ background: "#000", height: "5px", marginTop: "-5px" }}
                    indicatorColor="primary"
                    textColor="primary"
                      centered={true}
                    variant="standard"
                    scrollButtons="off"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab className={classes.tabs} label="Live Events" {...a11yProps(0)} />
                    <Tab className={classes.tabs} label="Pre-Recorded" {...a11yProps(1)} />

                </Tabs>
                </Paper>
            {/*<Switch>*/}
            {/*    <Route*/}
            {/*        path={`/live`}*/}
            {/*        exact*/}
            {/*        component={() => <Events category={props.category}*/}
            {/*                                          title="Language Learners"/>}*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*        path={`./recorded`}*/}
            {/*        exact*/}
            {/*        component={() => <PreRecordedEvents category={props.category}*/}
            {/*                                          title="Language Learners"/>}*/}
            {/*    />*/}
            {/*</Switch>*/}
            <TabPanel value={value} index={0}>
                <Events category={props.category} title={props.title}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PreReordedEvents category={props.category} title={props.title}/>
            </TabPanel>
            {/*<TabPanel value={value} index={0}>*/}
            {/*    <Events category={props.category} title={props.title}/>*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={1}>*/}
            {/*    <PreRecordedEvents category={props.category} title={props.title}/>*/}
            {/*</TabPanel>*/}
        </div>
    );
}
