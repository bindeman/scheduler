import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import moment from "moment-timezone";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import PrimaryButton from "./PrimaryButton";
import ResponsiveTime from "./ResponsiveTime";
import liveBadge from "./img/livebadge.svg";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";




const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        //overflow: 'auto,
        position: "relative",
        //margin: 'auto 50px auto 50px',
        borderRadius: "13px",
        flexDirection: 'column',
        boxShadow: "0 0 40px 0 rgba(0,0,0,0.15)",
        textAlign: "left",
        textTransform: "none",


    },
    eventTitle: {
        fontSize: "13px",
        fontWeight: "700",
        color: "#444444",
        letterSpacing: "-0.08px",
        lineHeight: "17px",
    },
    eventSubtitle: {
        fontSize: "13px",
        fontWeight: "600",
        display: "block",
        color: "#658546",
        letterSpacing: "-0.08px",
        lineHeight: "17px",
    },
    titleGutter: {
        marginBottom: "8px"
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
    closeButton: {
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(2),
        color: "#D3D3D3",
    },
    eventDescription: {
        fontWeight: 600,
        fontSize: "11px",
        color: "#BABABA",
        letterSpacing: "-0.03px",
        lineHeight: "14px"
    },
    dialogBottom: {
        backgroundColor: "#F7F7F7",
        marginTop: "20px",
        padding: "23px 35px",
        display: "flex",
    },
    dialogTitle: {
        fontWeight: 700,
        fontSize: "13px",
        color: "#A5A5A5",
    },
    modalContent: {
        padding: "20px"
    },
    liveBadge: {
        maxWidth: "60px",
        maxHeight: "25px"
    }
}));


export default function EventModal(props) {

let eventTitleText;
let buttonText
    switch (props.eventStatus) {
        case "future":
            eventTitleText = "Scheduled event " + moment(props.dateInUserTimeZone).fromNow();
            buttonText = "Event Page"
            break;
        case "past":
            eventTitleText = "Past event from " + moment(props.dateInUserTimeZone).format('MMMM Do, YYYY');
            buttonText = "Watch Recording"
            break;
        case "live":
            eventTitleText = "Event started " + moment(props.dateInUserTimeZone).fromNow();
            buttonText = "Join Event"
            break;
        case "recorded":
            eventTitleText = "Pre-Recorded event";
            buttonText = "Watch Event"
            break;

    }

const classes = useStyles();


  return (
    <React.Fragment>
        <Dialog
            style={{position: 'sticky', height: "100%"}}
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open={props.open}
            classes={{paper: classes.paper}}
            container={() => document.getElementById('content')}
            BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.10)", position: "fixed"} }}
            onClose={props.closeModal}>

            <div className={classes.modalContent}>
            <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                {props.eventStatus === "live" && (<img alt="Live Badge" className={classes.liveBadge} src={liveBadge}/>)}
                <Typography className={classes.dialogTitle}>
                    {eventTitleText}
                </Typography>
                </div>
                <IconButton className={classes.closeButton} onClick={props.closeModal}>
                    <CloseIcon />
                </IconButton>

            </DialogTitle>
                <DialogContent style={{ overflow: "hidden" }}>
                    <Grid container spacing={6}>
                        <Grid item xs={12} sm={7}>
                            <Typography className={`${classes.eventTitle} ${classes.titleGutter}`}>{props.title}</Typography>
                            <Typography className={classes.eventDescription}>{props.description}</Typography>



                            {/*<div className={classes.root}>*/}
                            {/*    <Chip label="Basic" />*/}
                            {/*    <Chip label="Disabled" disabled />*/}
                            {/*    <Chip avatar={<Avatar>M</Avatar>} label="Clickable" />*/}
                            {/*</div>*/}

                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Typography className={classes.eventSubtitle}>{`${props.presenter},`}</Typography>
                            <Typography className={`${classes.eventSubtitle} ${classes.titleGutter}`}>{props.organization}</Typography>
                            <Typography className={classes.eventDescription}>{props.bio}</Typography>
                        </Grid>
                        {/*<Grid item xs={12} sm={8}>*/}

                        {/*    <Typography className={classes.eventSubtitle}>*/}
                        {/*        {`${props.presenter}, ${props.organization}`}*/}
                        {/*    </Typography>*/}
                        {/*</Grid>*/}
                    </Grid>
                </DialogContent>
            </div>
                    <DialogActions
                        className={classes.dialogBottom} disableSpacing>
                        <ResponsiveTime
                            dateInUserTimeZone={props.dateInUserTimeZone}
                            duration={props.duration}
                        />
                        <PrimaryButton link={props.link} text={buttonText}/>
                        {/*onClick={props.closeModal}*/}
                    </DialogActions>
        </Dialog>



    </React.Fragment>
  );

}
