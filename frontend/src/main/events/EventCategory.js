import React, {useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {ChevronRight} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import moment from "moment-timezone";
import EventModal from "./EventModal";
import ResponsiveTime from "../../time/ResponsiveTime";
import Duration from "../../time/timeComponents/Duration";
import axios from "axios";



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
        marginTop: "18px",
        transition: "0.25s",
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
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalProps, setModalProps] = React.useState({
    });

    const now = new Date();
     const handleModalOpen = (e, item) => {
         const urlType = props.eventStatus === "prerecorded" ? "recorded" : "live"
         const FetchData = async () => {
             const presentersResponse = await axios.get(`/api/events/${urlType}/id/${item.id}`, {});
             console.log(presentersResponse.data.presenters)
             const presenters = presentersResponse.data.presenters
             console.log(presenters);

             return presentersResponse.data.presenters;
        }


         FetchData().then((presenters)=> {
             console.log("AND THE PRESENTERS ARE:")
             console.log(presenters);
             const props = {
                 title: item.title,
                 id: item.id,
                 presenter: item.presenter,
                 presenters: presenters,
                 organization: item.organization,
                 duration: item.duration,
                 description: item.description,
                 bio: item.bio,
                 apiUrlType: "live",
                 dateInUserTimeZone: item.dateInUserTimeZone,
                 category: item.category,
                 link: item.link,
                 pastlink: item.pastlink
             }
             console.log(props);
             setModalProps(props);
             setModalOpen(true);
         });
         console.log(props);




    }

    const handleModalClose = () => {
        setModalOpen(false);
    };

     const printDateInCorrectFormat = (dateOfEvent) => {
         let eventDate = new Date(dateOfEvent).getTime();
         if(Math.abs(now - eventDate ) < 170000000) {
             return moment(dateOfEvent).fromNow();
         } else {
             return moment(dateOfEvent).format('MMMM D, YYYY');
         }
         console.log(eventDate.getTime());
         //return eventDate.getTime();
    }
const classes = useStyles();

const items = props.data.filter(item => item.title.toLowerCase().includes(props.query.toLowerCase()) || item.description.toLowerCase().includes(props.query.toLowerCase()) || item.presenter.toLowerCase().includes(props.query.toLowerCase()));

  return (
    <React.Fragment>


        <div>

        {props.eventStatus === 'live' && <Typography className={classes.dateHeading}>Events happening right now</Typography>}
        {items.map((item, index) => {
            return (
                    <div>
                    {item.dateHeader && <Typography className={classes.dateHeading}>Events {printDateInCorrectFormat(item.dateInUserTimeZone)}</Typography>}
                    <Button
                        onClick={(e => handleModalOpen(e, item))}
                        endIcon={<ChevronRight  className={classes.buttonChevron}/>}
                    className={classes.paper}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={props.eventStatus !== 'prerecorded' ? 3 : 12}>
                            <ResponsiveTime
                                dateInUserTimeZone={props.eventStatus !== 'prerecorded' ? item.dateInUserTimeZone : null}
                                duration={item.duration}
                                eventStatus={props.eventStatus}
                            />
                        </Grid>

                        <Grid item xs={12} sm={props.eventStatus !== 'prerecorded' ? 8 : 12}>
                            <Typography className={classes.eventTitle}>{item.title}</Typography>
                            <Typography className={classes.eventSubtitle}>
                                {item.presenter}
                            </Typography>
                        </Grid>
                    </Grid>
                </Button>
                    </div>)
        })}
            <EventModal
                open={modalOpen}
                title={modalProps.title}
                presenter={modalProps.presenter}
                id={modalProps.id}
                organization={modalProps.organization}
                duration={modalProps.duration}
                description={modalProps.description}
                bio={modalProps.bio}
                presenters={modalProps.presenters}
                apiUrlType={modalProps.apiUrlType}
                dateInUserTimeZone={modalProps.dateInUserTimeZone}
                link={modalProps.link}
                pastlink={modalProps.pastlink}
                eventStatus={props.eventStatus}
                closeModal={handleModalClose}

            >
            </EventModal>
        </div>

    </React.Fragment>
  );

}
