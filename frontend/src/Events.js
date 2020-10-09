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
import EventCategory from "./EventCategory";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";





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
    const [liveEvents, setLiveEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [loading, setLoading] = useState(true);


    const switchData = (selectedEvent) => {
        setEvents(selectedEvent);
    };


    React.useEffect(() => {
        const FetchData = async () => {
            console.log("======= Props are: " + props.category);
            const response = await axios.get(`/api/events/`, {
                headers: {
                    'timezone': timezone.name()
                }
            });

            const liveEventsResponse = await axios.get(`/api/events/live`, {
                headers: {
                    'timezone': timezone.name()
                }
            });
            let currentDate = null;
            console.log(response.data);
            console.log("Hey this function is run");
            setLiveEvents(liveEventsResponse.data)
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

                <Fade in={!loading} timeout={500}>
                    <div>
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button>Future Events</Button>
                        <Button>Past Events</Button>
                        <Button>
                        <Select labelId="label" id="select" value="20">
                            <MenuItem value="10">Ten</MenuItem>
                            <MenuItem value="20">Twenty</MenuItem>
                        </Select>
                        </Button>
                    </ButtonGroup>
                    <EventCategory data={liveEvents}/>
                    {/*<EventCategory data={events}/>*/}
                    </div>
                </Fade>

        </Grid>


        {!loading && (<Copyright />)}

    </React.Fragment>
  );

}
