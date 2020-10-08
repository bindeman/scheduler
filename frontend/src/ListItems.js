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
import {useLocation, Link, NavLink, LinkProps } from "react-router-dom";


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
        marginTop: "14px",
        "&.active": {
            background: '#F9F9F9',
        },


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
        marginTop: "11px",
        marginBottom: "11px",
        fontWeight: 700
    },
    menuListItemIcon: {
        width: "100%"
    },
    hiThereGOODSir: {
        backgroundColor: "red",
        fontWeight: 900,
    },

}));

export default function ListItems(props) {
    const menuItems = [
        {
            title: "Language Learners",
            imageURL: learners,
            link: "/learners"
        },
        {
            title: "Language Educators",
            imageURL: educators,
            link: "/educators"
        },
        {
            title: "Employers, Language Service Providers and H.R. Personnel",
            imageURL: employers,
            link: "/employers"
        },
        {
            title: "Administrators, Counselors and College Recruiters",
            imageURL: administrators,
            link: "/administrators"
        },
        {
            title: "Language Learning Content and Assessment Providers",
            imageURL: contentproviders,
            link: "/contentproviders"
        },
    ];

    const menubar = useMenuStyles();

    // const CustomLink = React.useMemo(
    //     (url) =>
    //         React.forwardRef((linkProps, ref) => (
    //             <Link ref={ref} to={url} {...linkProps} />
    //         )),
    //     [url],
    // );

    // const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    //     <Link innerRef={ref} {...props} />
    // ));
    const location = useLocation();
    console.log(location.pathname);
    return (
        <List className={menubar.menuList}>
        <div>
            {menuItems.map(item => (
                <ListItem className={menubar.menuListItem} button component={NavLink} to={item.link} activeClassName="active">
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