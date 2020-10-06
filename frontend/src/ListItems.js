import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import employers from './img/employers.png';
import learners from './img/learners.png';
import administrators from './img/adminstrators.png';
import contentproviders from './img/contentproviders.png';
import educators from './img/educators.png';
import clsx from "clsx";

const useMenuStyles = makeStyles(() => ({
    menuList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        width: "100%",
        paddingLeft: "20px",
        paddingRight: "20px",
    },
    menuListItem: {
        borderRadius: "8px",

    },
    menuListItemText: {
        fontSize: "11px",
        lineHeight: "9px",
        display: "block",
        width: "130px",
        opacity: "100%",
        transitionDelay: "0.15s",
        transition: "0.4s",
    },
    menuListItemTextClosed: {
        fontSize: "11px",
        lineHeight: "9px",
        display: "block",
        width: "130px",
        opacity: "0%",
        transition: "0.25s",
    },
    menuListItemIconContainer: {
        width: "30px",
        height: "auto",
        marginTop: "18px",
        marginBottom: "18px",
        fontWeight: 700
    },
    menuListItemIcon: {
        width: "100%"
    }
}));

export default function ListItems(props) {
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

    const menubar = useMenuStyles();

    return (
        <List className={menubar.menuList}>
        <div>
            {menuItems.map(item => (
                <ListItem className={menubar.menuListItem} button href={item.link}>
                    <ListItemIcon>
                        <div className={menubar.menuListItemIconContainer}>
                        <img alt={`${item.title} icon`} className={menubar.menuListItemIcon} src={item.imageURL}/>
                        </div>
                    </ListItemIcon>
                    <ListItemText primary={
                        <Typography className={clsx( !props.drawerOpen && menubar.menuListItemTextClosed, menubar.menuListItemText)}
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