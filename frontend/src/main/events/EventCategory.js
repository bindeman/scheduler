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
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalProps, setModalProps] = React.useState({
    });

     const handleModalOpen = (e, item) => {
        const props = {
            title: item.title,
            presenter: item.presenter,
            organization: item.organization,
            duration: item.duration,
            description: item.description,
            bio: item.bio,
            dateInUserTimeZone: item.dateInUserTimeZone,
            category: item.category,
            link: item.link
        }

        setModalProps(props);
        setModalOpen(true);

    }

    const handleModalClose = () => {
        setModalOpen(false);
    };
const classes = useStyles();

  return (
    <React.Fragment>


        <div>

        {props.eventStatus === 'live' && <Typography className={classes.dateHeading}>Events happening right now</Typography>}
        {props.data.map((item, index) => {
            return (
                    <div>
                    {item.dateHeader && <Typography className={classes.dateHeading}>Events {moment(item.dateInUserTimeZone).fromNow()}</Typography>}
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
                                {`${item.presenter}, ${item.organization}`}
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
                organization={modalProps.organization}
                duration={modalProps.duration}
                description={modalProps.description}
                bio={modalProps.bio}
                dateInUserTimeZone={modalProps.dateInUserTimeZone}
                link={modalProps.link}
                eventStatus={props.eventStatus}
                closeModal={handleModalClose}

            >
            </EventModal>
        </div>

    </React.Fragment>
  );

}
