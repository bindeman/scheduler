import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import moment from "moment-timezone";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import PrimaryButton from "../../buttons/PrimaryButton";
import ResponsiveTime from "../../time/ResponsiveTime";
import liveBadge from "../../img/livebadge.svg";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {WidthContext} from "../../WidthContext";
import clsx from "clsx";
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        //overflow: 'auto,
        //margin: 'auto 50px auto 50px',
        borderRadius: "13px",
        flexDirection: 'column',
        boxShadow: "0 0 40px 0 rgba(0,0,0,0.15)",
        textAlign: "left",
        textTransform: "none",


    },
    eventTitle: {
        fontSize: "14px",
        fontWeight: "700",
        color: "#444444",
        letterSpacing: "-0.08px",
        lineHeight: "17px",
    },
    smallModalMargin: {
        margin: "5px",
    },
    eventSubtitle: {
        fontSize: "13px",
        fontWeight: "600",
        marginBottom: "2px",
        display: "block",
        color: "#658546",
        letterSpacing: "-0.08px",
        lineHeight: "17px",
        transition: "0.2s",
        '&:hover': {
            color: "black",
            transition: "0.2s"
        },
    },
    eventSubtitleInactive: {
        fontSize: "13px",
        fontWeight: "600",
        display: "block",
        color: "#658546",
        letterSpacing: "-0.08px",
        lineHeight: "17px",
        transition: "0.2s",
    },

    noDecoration: {
        textDecoration: "none",
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
        fontSize: "12px",
        color: "#BABABA",
        letterSpacing: "-0.04px",
        lineHeight: "15px",
        marginBottom: "8px",
    },
    personDescription: {
        fontWeight: 600,
        fontSize: "11px",
        color: "#BABABA",
        letterSpacing: "-0.03px",
        lineHeight: "14px",
        marginBottom: "8px",
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
    },
    newLinkIcon: {
        fontSize: "11px",
        margin: "2.5px",

    }
}));


export default function EventModal(props) {

    // React.useEffect(() => {
    //     const FetchData = async () => {
    //         const presentersResponse = await axios.get(`/api/events/live/id/${props.id}`, {
    //         });
    //         console.log("===============PRESENTERS================")
    //         console.log(presentersResponse.data.presenters);
    //
    //         //setPresenters((presentersResponse.data.presenters));
    //         setLoading(false);
    //     }
    //     FetchData();
    // }, []);

    console.log(props.presenters)
    // const [loading, setLoading] = useState(true);
    // const [presenters, setPresenters] = useState([
    //     {name: "Phil Bindex", bio: "We're live and ready to go"},
    //     {name: "Yo Man", bio: "We're live and ready to go"},
    //     {name: "Light the lights", bio: "We're live and ready to go"},
    //     {name: "Hi There sirs", bio: "We're live and ready to go"},
    // ]);
    const {open, setOpen} = useContext(WidthContext);
    let eventTitleText;
    let toolTipText;
    let buttonText;
    let buttonDisabled = false;
    const now = new Date();

    let buttonLink = props.link;
    switch (props.eventStatus) {
        case "future":
            eventTitleText = "Scheduled event " + moment(props.dateInUserTimeZone).fromNow();
            buttonText = "Join Event";
            // if(props.dateInUserTimeZone.getTime() - now.getTime() < 1800000) {
            //     buttonDisabled = false;
            // } else {
            //     buttonDisabled = true;
            // }
            buttonDisabled = true;
            break;
        case "past":
            eventTitleText = "Past event from " + moment(props.dateInUserTimeZone).format('MMMM Do, YYYY');
            buttonText = "Watch Recording"
            if(props.pastlink) {
                buttonLink = props.pastlink
            } else {
                buttonDisabled = true;
                toolTipText = "Recording will be available shortly after the Global C.R.E.D conference concludes"
            }
            break;
        case "live":
            eventTitleText = "Event started " + moment(props.dateInUserTimeZone).fromNow();
            buttonText = "Join Event"
            break;
        case "prerecorded":
            if(moment(props.dateInUserTimeZone).isAfter(now)) {
                eventTitleText = "On-demand event available " + moment(props.dateInUserTimeZone).fromNow();
                buttonDisabled = true;
            } else {
                eventTitleText = "On-Demand Event";
            }
            buttonText = "Watch Event";
            break;
    }

const classes = useStyles();


  return (
    <React.Fragment>
        <Dialog
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open={props.open}
            classes={{paper: clsx(classes.paper, open == 0 && classes.smallModalMargin) }}
            container={() => document.getElementById('content')}
            BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.10)"} }}
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
                            {props.presenters && props.presenters.map((presenter) => {
                                return (
                                <React.Fragment>
                                <a
                                    className={classes.noDecoration}
                                    target="_blank"
                                    href={presenter.link}>
                                    <Typography className={presenter.link ? classes.eventSubtitle : classes.eventSubtitleInactive}>{`${presenter.name}`}
                                        {presenter.link && (
                                        <span>
                                            <OpenInNewRoundedIcon className={classes.newLinkIcon}/>
                                        </span>
                                        )}
                                    </Typography>
                                </a>
                                <Typography className={classes.personDescription}>{presenter.bio}</Typography>
                                </React.Fragment>
                                )
                            })
                        }
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
                        <Tooltip disableFocusListener disableHoverListener={!buttonDisabled}
                                 arrow={true}
                                 title={toolTipText ? toolTipText : eventTitleText}
                                 placement="top">
                        <div>
                        <PrimaryButton disabled={buttonDisabled} link={buttonDisabled ? null : buttonLink} text={buttonText}/>
                        </div>
                        </Tooltip>
                    </DialogActions>
        </Dialog>



    </React.Fragment>
  );

}
