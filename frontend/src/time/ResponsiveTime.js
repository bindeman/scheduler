import React from "react";
import {
    makeStyles,
} from "@material-ui/core/styles";
import EventTime from "./timeComponents/EventTime";
import Duration from "./timeComponents/Duration";





const useStyles = makeStyles((theme) => ({
    root: {
        //margin: "8px 8px 8px 0",
        display: "flex",
        flexWrap: "wrap",
        marginRight: "auto"

    }
}));

export default function ResponsiveTime(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.eventStatus !== 'prerecorded' && <EventTime time={props.dateInUserTimeZone} eventStatus={props.eventStatus}/>}
            <Duration duration={props.duration} time={props.dateInUserTimeZone} eventStatus={props.eventStatus}/>

        </div>

    );
}
