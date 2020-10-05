import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Deposits from "./Events";
import Box from "@material-ui/core/Box";


import employers from './img/employers.png';
import learners from './img/learners.png';
import administrators from './img/adminstrators.png';
import contentproviders from './img/contentproviders.png';
import educators from './img/educators.png';
import globalSealLogo from './img/globalSealLogo.png'
import globalCRED from './img/globalCRED.svg'

const useStyles = makeStyles((theme) => ({
    list: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    listItem: {
        borderRadius: "8px",
        width: "calc(100% - 18px)",
        marginLeft: "9px",
        marginRight: "9px",
        marginTop: "18px",
        marginBottom: "18px"
    },
    listItemText: {
        fontSize: "11px",
        lineHeight: "9px"
    },
    listItemIcon: {
        width: "30px",
        fontWeight: 700
    }
}));






export default function ListItems() {
    const menuItems = [
        {
            title: "Language Learners",
            imageURL: learners,
            link: "#"
        },
        {
            title: "Language Educators",
            imageURL: educators,
            link: "#"
        },
        {
            title: "Employers, Language Service Providers and H.R. Personnel",
            imageURL: employers,
            link: "#"
        },
        {
            title: "Administrators, Counselors and College Recruiters",
            imageURL: administrators,
            link: "#"
        },
        {
            title: "Language Learning Content and Assessment Providers",
            imageURL: contentproviders,
            link: "#"
        },
    ];



    const classes = useStyles();

    return (
        <List className={classes.list}>
        <div>
            {menuItems.map(item => (
                <ListItem className={classes.listItem} button href={item.link}>
                    <ListItemIcon>
                        <img className={classes.listItemIcon} src={item.imageURL}/>
                    </ListItemIcon>
                    <ListItemText primary={
                        <Typography className={classes.listItemText}
                            component="span"
                            variant="body2"
                            color="textPrimary"

                        ><Box
                            lineHeight={1.4}
                            fontWeight={600}
                        >
                            {item.title}
                        </Box>

                        </Typography> }/>
                </ListItem>

            ))}
        </div>
        </List>
    );
}