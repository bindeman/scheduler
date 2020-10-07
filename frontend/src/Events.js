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
    },
    dateHeading: {
        fontSize: "16px",
        textAlign: "left",
        fontWeight: 700,
        color: "#B0B0B0",
        letterSpacing: "-0.2px"
    },
    heroTitle: {
        fontSize: "23px",
        textTransform: "uppercase",
        fontWeight: 800,
        color: "#1C5100",
        letterSpacing: "-0.57px",
        lineHeight: "23px",
        textAlign: "left",
        maxWidth: "350px",
        transition: "0.25s"
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {`Copyright © ${new Date().getFullYear()} `}
            <Link color="inherit" href="http://theglobalseal.com">
                The Global Seal.
            </Link>{' '}

            {'All rights reserved.'}
        </Typography>
    );
}

export default function Events() {
    const timezone = jstz.determine();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const FetchData = async () => {
            const response = await axios.get('/api/events');
            console.log(response.data);
            console.log("Hey this function is run");
            setEvents(response.data);
            setLoading(false);
        }
        FetchData();
    }, []);

  const classes = useStyles();
  const results = events;
  return (
    <React.Fragment>


        {!loading && (
            <Fade in={!loading} timeout={500}>
            <Grid item xs={12}>
             <Typography className={classes.heroTitle}>Events Schedule for Language Learners</Typography>
        </Grid>
            </Fade>
                )}
        <Grid item xs={12} style={{margin: "auto"}}>
        {/*<Typography className={classes.dateHeading}>December 2, 2020</Typography>*/}
        {loading && (
                <LoadingSpinner/>
            )}
        {!loading && results.map((item) => {
            let date = moment(item.date);
            let time = date.tz(timezone.name()).format('LT z');
            console.log(time);

            console.log(time);

            return (
                <Fade in={!loading} timeout={500}>
                <Button
                    endIcon={<ChevronRight
                        className={classes.buttonChevron}/>}
                    className={classes.paper}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={3}>
                            <Grid container xs={12} sm={3} spacing={0}>
                                <Grid item xs={4} sm={12}>
                                    <Button size="large"
                                            className="startTime"
                                            variant="contained"
                                            disableRipple={true}
                                            disabled={false}
                                            className={classes.eventTime}>
                                        {time}
                                    </Button>
                                </Grid>

                                <Grid item xs={3} sm={12}>
                                    <div className={classes.duration}>
                                        <ScheduleIcon className={classes.durationIcon}/>
                                        <Typography className={classes.durationText}>
                                            {`${item.duration} min`}
                                        </Typography>
                                    </div>
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
                </Fade>)
        })}
        </Grid>

        {!loading && (<Copyright />)}

    </React.Fragment>
  );

}
