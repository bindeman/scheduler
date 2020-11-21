import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import jstz from 'jstz';
import LoadingSpinner from "../../../misc/Spinner";
import Fade from '@material-ui/core/Fade';
import EventCategory from "../EventCategory";
import NoEvents from "../../../misc/notFound/NoEvents";
import Copyright from "../../../misc/Copyright";
import {WidthContext} from "../../../WidthContext";
import clsx from "clsx";
import moment from "moment-timezone";
import LanguageIcon from '@material-ui/icons/Language';
import TextField from "@material-ui/core/TextField";
import {Search, Pageview} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";



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
        lineHeight: "17px",

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
    timeZoneHeading: {
        fontSize: "13px",
        textAlign: "left",
        fontWeight: 700,
        //color: "#B0B0B0",
        color: "#658546",
        letterSpacing: "-0.2px",
        marginTop: "3px",
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
    },
    timezoneWrapper: {
        display: "flex",
        alignItems: "left",
        //maxWidth: "100px",
        justifyContent: "left",
        paddingTop: "7px",
        paddingBottom: "4px",
        color: "#727272",
        minWidth: theme.spacing(8),
    },
    timezoneIcon: {
        fontSize: "20px",
        margin: "1.5px 3px 1px 0px",
        color: "#658546",
    },
    search: {
        width: "100%",
        borderRadius: "30px",
        marginTop: "50px",
        marginBottom: "-10px",
        fontSize: "10px",
        border: "0px",
        backgroundColor: "#ECECEC",
        transition: "0.25s",
        '&:hover': {
            backgroundColor: "#E4E4E4",
            transition: "0.25s",
        },
    },
    notchedOutline: {
        borderWidth: "1px",
        borderRadius: "30px",
        borderColor: "transparent !important",
    },
    searchSize: {
        fontSize: "13px",
        fontWeight: 600,
        textAlign: "left",
    },
    searchIcon: {
        fontSize: "17px",
        marginRight: "8px",
    }
}));


export default function Events(props) {
    const timezone = jstz.determine();

    const formattedTimezone = timezone.name().replace("_", " ");
        //.replace("30", ":30").replace("+", "GMT+");
    const [futureEvents, setFutureEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
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


    const onChangeSearch = ((e) => {
        console.log(e.target.value)
        setSearchQuery(e.target.value)
    })

const classes = useStyles();

const {open, setOpen} = useContext(WidthContext);



  return (
    <React.Fragment>

        {!loading && (
            <Fade in={!loading} timeout={500}>
            <Grid item xs={12}>

                {!(liveEvents.length === 0 && futureEvents.length === 0 && pastEvents.length === 0) && (
                        <React.Fragment>
                        <Typography className={clsx(classes.heroTitle, open === 0 && classes.heroTitleMobile)}>Live Events Schedule for {props.title}</Typography>
                        <div className={classes.timezoneWrapper}>
                            <LanguageIcon className={classes.timezoneIcon}/>
                            <Typography className={classes.timeZoneHeading}>Timezone: {formattedTimezone} ({moment.tz(timezone.name()).format('z')})</Typography>
                        </div>
                        </React.Fragment>
                )

                }

                <TextField
                    style={{fontSize: 10}}
                    className={classes.search}
                    id="input-with-icon-grid"
                    variant="outlined"
                    type="search"
                    placeholder={"Search"}
                    size="small"
                    onChange={e => onChangeSearch(e)}
                    InputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline,
                            input: classes.searchSize
                        },
                        startAdornment: (
                            <InputAdornment>
                                    <Search className={classes.searchIcon} />
                            </InputAdornment>
                        )
                    }}/>
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
                    <EventCategory data={liveEvents} eventStatus={"live"} query={searchQuery}/>}
                    <EventCategory data={futureEvents} eventStatus={"future"} query={searchQuery}/>
                    <EventCategory data={pastEvents} eventStatus={"past"} query={searchQuery} />
                    </div>
                </Fade>

        </Grid>


        {!loading &&
        <Fade in={!loading} timeout={500}>
        <div>
            {!liveEvents.length && !futureEvents.length && !pastEvents.length && <NoEvents/>}
            <Copyright />
        </div>
        </Fade>
        }


    </React.Fragment>
  );

}
