import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Paper from '@material-ui/core/Paper'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {IconButton} from "@material-ui/core";
import {ChevronRight, Schedule} from "@material-ui/icons";
import ScheduleIcon from '@material-ui/icons/Schedule';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import learners from "./img/learners.png";
import educators from "./img/educators.png";
import employers from "./img/employers.png";
import administrators from "./img/adminstrators.png";
import contentproviders from "./img/contentproviders.png";
import {ScaleHelper} from "recharts/lib/util/CartesianUtils";
import withStyles from "@material-ui/core/styles/withStyles";
import { green, purple } from '@material-ui/core/colors';

function preventDefault(event) {
  event.preventDefault();
}


const useStyles = makeStyles((theme) => ({
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
    duration: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "7px",
        color: "#727272",
        minWidth: theme.spacing(8),

    },
    durationText: {
        fontSize: "10px",
    },
    durationIcon: {
        fontSize: "14px",
        margin: "1.5px 3px 1px 0px"
    },
    eventTime: {
        backgroundColor: "#658546",
        boxShadow: "none",
        color: "#fff",
        textTransform: "lowercase",
        padding: "3px 8px 2px 8px",
        borderRadius: "3px",
        letterSpacing: "-0.28px",
        fontWeight: 700,
        marginTop: "3px",
        fontSize: "11px",
        "&:disabled":  {
            backgroundColor: "red",
            color: "purple"
        },
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "#658546",
            boxShadow: "none",
        }
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
    }
}));




export default function Events() {
    const events = [
        {
            title: "Exploring the differences between language, international affairs, and copyright law in the East Asia",
            presenter:"Linda Egnatz",
            organization: "Walworth Foundation",
            date: "December 3rd, 2020",
            startTime: "2:30 pm",
            endTime: "3:00 pm",
            duration: "30 min"
        },
        {
            title: "Rule and language, and exploration of the foundations of Arabic?",
            presenter:"Frank Underwood",
            organization: "Literacy Foundation",
            date: "December 3rd, 2020",
            startTime: "2:30 pm",
            endTime: "3:00 pm",
            duration: "30 min"
        },
        {
            title: "Exploring the differences between language, international affairs, and copyright law in the East Asia",
            presenter:"Doug Stamper",
            organization: "Services of the National Youth Association for Children",
            date: "December 3rd, 2020",
            startTime: "2:30 pm",
            endTime: "3:00 pm",
            duration: "30 min"
        },
        {
            title: "Exploring the differences between language, international affairs, and copyright law in the East Asia",
            presenter:"Kathy Durant",
            organization: "Academy of the Arts",
            date: "December 3rd, 2020",
            startTime: "2:30 pm",
            endTime: "3:00 pm",
            duration: "30 min"
        },
        {
            title: "Rule and language, and exploration of the foundations of Arabic?",
            presenter:"Linda Egnatz",
            organization: "Walworth Foundation",
            date: "December 3rd, 2020",
            startTime: "2:30 pm",
            endTime: "3:00 pm",
            duration: "30 min"
        },
        {
            title: "Exploring the differences between language, international affairs, and copyright law in the East Asia",
            presenter:"Linda Egnatz",
            organization: "Walworth Foundation",
            date: "December 3rd, 2020",
            startTime: "2:30 pm",
            endTime: "3:00 pm",
            duration: "30 min"
        },
        {
            title: "Exploring the differences between language, international affairs, and copyright law in the East Asia",
            presenter:"Linda Egnatz",
            organization: "Walworth Foundation",
            date: "December 3rd, 2020",
            startTime: "2:30 pm",
            endTime: "3:00 pm",
            duration: "30 min"
        },
        {
            title: "Rule and language, and exploration of the foundations of Arabic?",
            presenter:"Linda Egnatz",
            organization: "Walworth Foundation",
            date: "December 3rd, 2020",
            startTime: "12:30 pm",
            endTime: "3:00 pm",
            duration: "30 min"
        },
        {
            title: "Exploring the differences between language, international affairs, and copyright law in the East Asia",
            presenter:"Linda Egnatz",
            organization: "Walworth Foundation",
            date: "December 3rd, 2020",
            startTime: "2:30 pm",
            endTime: "3:00 pm",
            duration: "30 min"
        },

    ];

  const classes = useStyles();
  return (
    <React.Fragment>
        {events.map(event => (
        <Button endIcon={<ChevronRight className={classes.buttonChevron}/>} className={classes.paper}>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={3}>
                <Grid container xs={12} sm={3} spacing={4}>
                    <Grid item xs={3} sm={12}>
                    <Button size="large" className="startTime" variant="contained" disableRipple={true} disabled={false} className={classes.eventTime}>{event.startTime}</Button>
                    </Grid>

                    <Grid item xs={3} sm={12}>
                    <div className={classes.duration}>
                    <ScheduleIcon className={classes.durationIcon}/>
                    <Typography className={classes.durationText}>
                        {event.duration}
                    </Typography>
                    </div>
                    </Grid>
                </Grid>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography className={classes.eventTitle}>{event.title}</Typography>
                    <Typography className={classes.eventSubtitle}>
                        {`${event.presenter}, ${event.organization}`}
                    </Typography>
                </Grid>
            </Grid>
        </Button>))}
    </React.Fragment>
  );
}
