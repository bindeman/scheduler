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
    copyright: {
        fontSize: "10px",
        color: "#B0B0B0",
        position: "relative",
        bottom: "-20px"
    }
}));


export default function Events(props) {
    const timezone = jstz.determine();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDay, newDay] = useState(0);

    const handleNewDate = (date) => newDay(date);

    // const figureOutWhenDateEnds = ((events) => {
    //     events.map((item) => {
    //        console.log(item.date);
    //     });
    // });

    React.useEffect(() => {
        const FetchData = async () => {
            console.log("======= Props are: " + props.category);
            const response = await axios.get(`/api/events`, {
                headers: {
                    'timezone': timezone.name()
                }
            });
            let currentDate = null;
            console.log(response.data);
            console.log("Hey this function is run");
            setEvents(response.data);
            setLoading(false);
        }
        FetchData();
    }, []);

const classes = useStyles();




function Copyright() {
    return (
        <Typography className={classes.copyright} align="center">
            {`Copyright © ${new Date().getFullYear()} `}
            <Link color="inherit" href="http://theglobalseal.com">
                The Global Seal.
            </Link>{' '}

            {'All rights reserved.'}
        </Typography>
    );
}







  return (
    <React.Fragment>


        {!loading && (
            <Fade in={!loading} timeout={500}>
            <Grid item xs={12}>
             <Typography className={classes.heroTitle}>Events Schedule for {props.title}</Typography>
        </Grid>
            </Fade>
                )}
        <Grid item xs={12} style={{margin: "auto"}}>

        {loading && (
                <LoadingSpinner/>
            )}
        {!loading && events.map((item, index) => {
            let date = moment(item.date);

            let time = date.format('LT z');
            let day = Number(date.format('D'));





            // console.log(day);
            //
            // console.log(time);

            return (
                <Fade in={!loading} timeout={500}>
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
                    </div>
                </Fade>)
        })}
        </Grid>


        {!loading && (<Copyright />)}

    </React.Fragment>
  );

}
