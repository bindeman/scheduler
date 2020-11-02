import React from "react";
import {
    makeStyles,
} from "@material-ui/core/styles";
import EventTime from "./timeComponents/EventTime";
import Duration from "./timeComponents/Duration";
import liveBadge from "./../img/livebadge.svg"


const useStyles = makeStyles((theme) => ({
    root: {
        //margin: "8px 8px 8px 0",
        display: "flex",
        flexWrap: "wrap",
        marginRight: "auto",

    },
    liveBadgeWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        width: "55px",
        marginTop: "6px",
        marginRight: 0,
        marginLeft: "auto",
    },
    liveBadge: {
        maxWidth: "30px",
    }
}));

export default function ResponsiveTime(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.eventStatus !== 'prerecorded' && <EventTime time={props.dateInUserTimeZone} eventStatus={props.eventStatus}/>}
            <Duration duration={props.duration} time={props.dateInUserTimeZone} eventStatus={props.eventStatus}/>
            {props.eventStatus === "live" && (<div className={classes.liveBadgeWrapper}> <img className={classes.liveBadge} alt="Live Badge" src={liveBadge}/></div>)}

        </div>

    );
}
