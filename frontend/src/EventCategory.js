import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {ChevronRight} from "@material-ui/icons";
import ScheduleIcon from '@material-ui/icons/Schedule';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import moment from "moment-timezone";
import jstz from 'jstz';
import LoadingSpinner from "./Spinner";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import EventTime from "./EventTime";
import Duration from "./Duration";



const useStyles = makeStyles(() => ({
    depositContext: {
        flex: 1,
    },
    paper: {
        padding: "26px 33px 26px 33px",
        display: 'flex',
        overflow: 'auto',
        borderRadius: "6px",
        flexDirection: 'column',
        width: "100%",
        textAlign: "left",
        textTransform: "none",
        backgroundColor: "#EFF0ED",
        marginTop: "18px"
    },
    eventTitle: {
        fontSize: "13px",
        fontWeight: "700",
        color: "#444444",
        letterSpacing: "-0.08px",
        lineHeight: "17px",
        marginBottom: "5px"
    },
    eventSubtitle: {
        fontSize: "13px",
        fontWeight: "600",
        color: "#658546",
        letterSpacing: "-0.08px",
        lineHeight: "17px"
    },
    buttonChevron: {
        fontSize: "5px",
        color: "#658546",
    },
    dateHeading: {
        fontSize: "16px",
        textAlign: "left",
        fontWeight: 700,
        color: "#B0B0B0",
        letterSpacing: "-0.2px",
        marginTop: "30px",
    },
}));


export default function EventCategory(props) {

const classes = useStyles();


  return (
    <React.Fragment>




        {props.data.map((item, index) => {
            return (
                    <div>
                    {item.dateHeader && <Typography className={classes.dateHeading}>Events {moment(item.dateInUserTimeZone).fromNow()}</Typography>}
                    <Button
                    endIcon={<ChevronRight
                        className={classes.buttonChevron}/>}
                    className={classes.paper}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={3}>
                            <Grid container xs={12} sm={3} spacing={0}>
                                <Grid item xs={4} sm={12}>
                                    <EventTime time={item.dateInUserTimeZone}/>
                                </Grid>

                                <Grid item xs={3} sm={12}>
                                <Duration duration={item.duration}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography className={classes.eventTitle}>{item.title}</Typography>
                            <Typography className={classes.eventSubtitle}>
                                {`${item.presenter}, ${item.organization}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Button>
                    </div>)
        })}

    </React.Fragment>
  );

}