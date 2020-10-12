import React from "react";
import {
    makeStyles,
} from "@material-ui/core/styles";
import EventTime from "./EventTime";
import Duration from "./Duration";





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
            <EventTime time={props.dateInUserTimeZone}/>
            <Duration duration={props.duration} time={props.dateInUserTimeZone} eventStatus={props.eventStatus}/>

        </div>

    );
}
