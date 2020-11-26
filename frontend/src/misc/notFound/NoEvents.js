import React from "react";
import {
    makeStyles,
} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import PrimaryWhiteButton from "../../buttons/PrimaryWhiteButton";

const useStyles = makeStyles((theme) => ({
    wrapper: {

        background: "linear-gradient(to bottom, #1C5100 0%, #658546 100%)",
        width: "100%",
        //overflow: 'auto,
        borderRadius: "13px",
        flexDirection: 'column',
        //boxShadow: "0 0 40px 0 rgba(0,0,0,0.15)",
        textAlign: "center",
        textTransform: "none",
        marginTop: "18px",
        padding: "30px",
        maxHeight: "fit-content"
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
        <div className={classes.wrapper}>
            <div>
            <Typography className={classes.eventTitle}>No events yet, check back soon.</Typography>
            <Typography className={classes.eventSubtitle}>There's no events listed so far in this category. For more details check our main page:</Typography>
            <PrimaryWhiteButton className={classes.button} link={"http://theglobalseal.com/cred"} text="Global C.R.E.D. Homepage"/>
            </div>
        </div>
    );


}
