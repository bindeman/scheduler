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
import clsx from "clsx";
import {WidthContext} from "../../../WidthContext";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Search} from "@material-ui/icons";



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
        transition: "0.25s"
    },
    heroTitleMobile: {
        marginTop: "70px",
    },
    search: {
        width: "100%",
        borderRadius: "30px",
        marginTop: "50px",
        marginBottom: "0px",
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


export default function PreRecordedEvents(props) {
    const timezone = jstz.determine();
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);


    React.useEffect(() => {
        const FetchData = async () => {
            //console.log("======= Props are: " + props.category);
            const response = await axios.get(`/api/events/recorded/category/${props.category}`, {
                headers: {
                    'timezone': timezone.name()
                }
            });


            // console.log(response.data);
            setEvents(response.data);
            setLoading(false);
        }
        FetchData();
    },[]);

    const onChangeSearch = ((e) => {
        //console.log(e.target.value)
        setSearchQuery(e.target.value)
    })

const classes = useStyles();
    const {open} = useContext(WidthContext);

      return (
        <React.Fragment>

            {!loading && events.length !== 0  && (
                <Fade in={!loading} timeout={500}>
                <React.Fragment>
                <Grid item xs={12}>

                    {events.length !== 0 &&
                        (<Typography className={clsx(classes.heroTitle, open === 0 && classes.heroTitleMobile)}>On-Demand Events for {props.title}</Typography>)}
            </Grid>
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
                        </React.Fragment>
                </Fade>
                    )}
            <Grid item xs={12} style={{margin: "auto"}}>

            {loading && (
                    <LoadingSpinner/>
                )}

                    <Fade in={!loading} timeout={500}>
                        <div>
                        <EventCategory data={events} eventStatus={"prerecorded"} query={searchQuery}/>
                        </div>
                    </Fade>
            </Grid>


            {!loading &&
            <Fade in={!loading} timeout={500}>
            <div>
                {!events.length && <NoEvents/>}
                <Copyright />
            </div>
            </Fade>
            }


        </React.Fragment>
      );

}
