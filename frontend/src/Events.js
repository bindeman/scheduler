import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import jstz from 'jstz';
import LoadingSpinner from "./Spinner";
import Link from "@material-ui/core/Link";
import Fade from '@material-ui/core/Fade';
import EventCategory from "./EventCategory";
import RecordedEvents from "./RecordedEvents";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";





const useStyles = makeStyles((theme) => ({
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
        //maxWidth: "350px",
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
            const response = await axios.get(`/api/events/future/category/${props.category}`, {
                headers: {
                    'timezone': timezone.name()
                }
            });

            const liveEventsResponse = await axios.get(`/api/events/live/category/${props.category}`, {
                headers: {
                    'timezone': timezone.name()
                }
            });

            const pastEventsResponse = await axios.get(`/api/events/past/category/${props.category}`, {
                headers: {
                    'timezone': timezone.name()
                }
            });

            let currentDate = null;
            console.log(response.data);
            console.log("Hey this function is run");
            setLiveEvents(liveEventsResponse.data);
            setEvents(response.data);
            setPastEvents((pastEventsResponse.data));
            setLoading(false);
        }
        FetchData();
    }, []);

const classes = useStyles();




function Copyright() {
    return (
        <p className={classes.copyright} align="center">
            {`Copyright © ${new Date().getFullYear()} `}
            <Link color="inherit" href="http://theglobalseal.com">
                The Global Seal.
            </Link>{' '}

            {'All rights reserved.'}
        </p>
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
                    {/*<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">*/}
                    {/*    <Button>Future Events</Button>*/}
                    {/*    <Button>Past Events</Button>*/}
                    {/*    <Button>*/}
                    {/*    <Select labelId="label" id="select" value="20">*/}
                    {/*        <MenuItem value="10">Ten</MenuItem>*/}
                    {/*        <MenuItem value="20">Twenty</MenuItem>*/}
                    {/*    </Select>*/}
                    {/*    </Button>*/}
                    {/*</ButtonGroup>*/}
                        {liveEvents.length > 0 &&
                    <EventCategory data={liveEvents} eventStatus={"live"}/>}
                    <EventCategory data={events} eventStatus={"future"}/>
                    <EventCategory data={pastEvents} eventStatus={"past"} />
                    </div>
                </Fade>

        </Grid>


        {!loading &&
        <div>
            <RecordedEvents/>
            <Copyright />
        </div>
        }


    </React.Fragment>
  );

}
