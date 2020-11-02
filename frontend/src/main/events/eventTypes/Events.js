import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import jstz from 'jstz';
import LoadingSpinner from "../../../misc/Spinner";
import Link from "@material-ui/core/Link";
import Fade from '@material-ui/core/Fade';
import EventCategory from "../EventCategory";
import NoEvents from "../../../misc/notFound/NoEvents";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Copyright from "../../../misc/Copyright";
import {WidthContext} from "../../../WidthContext";
import clsx from "clsx";





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
    heroTitleMobile: {
        marginTop: "70px",
    }
}));


export default function Events(props) {
    const timezone = jstz.determine();
    const [futureEvents, setFutureEvents] = useState([]);
    const [liveEvents, setLiveEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const FetchData = async () => {
            console.log("======= Props are: " + props.category);
            const futureEventsResponse = await axios.get(`/api/events/live/future/category/${props.category}`, {
                headers: {
                    'timezone': timezone.name()
                }
            });

            const liveEventsResponse = await axios.get(`/api/events/live/now/category/${props.category}`, {
                headers: {
                    'timezone': timezone.name()
                }
            });

            const pastEventsResponse = await axios.get(`/api/events/live/past/category/${props.category}`, {
                headers: {
                    'timezone': timezone.name()
                }
            });

            let currentDate = null;
            console.log(futureEventsResponse.data);
            console.log(pastEventsResponse.data);
            console.log(liveEventsResponse.data);
            console.log("Hey this function is run");
            setLiveEvents(liveEventsResponse.data);
            setFutureEvents(futureEventsResponse.data);
            setPastEvents((pastEventsResponse.data));
            setLoading(false);
        }
        FetchData();
    }, []);

const classes = useStyles();

const {open, setOpen} = useContext(WidthContext);

  return (
    <React.Fragment>

        {!loading && (
            <Fade in={!loading} timeout={500}>
            <Grid item xs={12}>
                {!(liveEvents.length === 0 && futureEvents.length === 0 && liveEvents.length === 0) && (
                <Typography className={clsx(classes.heroTitle, open === 0 && classes.heroTitleMobile)}>Events Schedule for {props.title}</Typography>)

                }
        </Grid>
            </Fade>
                )}
        <Grid item xs={12} style={{margin: "auto"}}>

        {loading && (
                <LoadingSpinner/>
            )}

                <Fade in={!loading} timeout={500}>
                    <div>
                        {liveEvents.length > 0 &&
                    <EventCategory data={liveEvents} eventStatus={"live"}/>}
                    <EventCategory data={futureEvents} eventStatus={"future"}/>
                    <EventCategory data={pastEvents} eventStatus={"past"} />
                    </div>
                </Fade>

        </Grid>


        {!loading &&
        <Fade in={!loading} timeout={500}>
        <div>
            {!liveEvents.length && !futureEvents.length && !liveEvents.length && <NoEvents/>}
            <Copyright />
        </div>
        </Fade>
        }


    </React.Fragment>
  );

}
