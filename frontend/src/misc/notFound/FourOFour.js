import React from "react";
import {
    makeStyles,
    withStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import PrimaryWhiteButton from "../../buttons/PrimaryWhiteButton";
import Copyright from "../Copyright";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        width: "100%",
    },
    wrapper: {

        background: "linear-gradient(to bottom, #1C5100 0%, #658546 100%)",
        width: "100%",

        //overflow: 'auto,
        borderRadius: "13px",
        flexDirection: 'column',
        //boxShadow: "0 0 40px 0 rgba(0,0,0,0.15)",
        textAlign: "center",
        textTransform: "none",

        padding: "30px",
    },
    content: {
        display: 'flex',
        margin: "auto",
        maxWidth: "250px",
    },
    eventTitle: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#fff",
        letterSpacing: "-0.08px",
        lineHeight: "21px",
        marginBottom: "8px"
    },
    eventSubtitle: {
        fontSize: "13px",
        fontWeight: "600",
        display: "block",
        color: "#fff",
        opacity: "0.5",
        letterSpacing: "-0.08px",
        lineHeight: "17px",
        marginBottom: "22px"
    },
}));






export default function NoEvents(props) {
    const classes = useStyles();
    return (
        <Fade in={true} timeout={500}>
        <div className={classes.root}>
        <div className={classes.wrapper}>
            <div>
            <Typography className={classes.eventTitle}>Page not found</Typography>
            <Typography className={classes.eventSubtitle}>To see Global C.R.E.D. events, click the link below.</Typography>
            <PrimaryWhiteButton className={classes.button} link={"/"} text="See Events"/>
            </div>

        </div>
    <Copyright/>
        </div>
        </Fade>
    );


}
