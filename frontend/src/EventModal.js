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
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";



const useStyles = makeStyles((theme) => ({
    depositContext: {
        flex: 1,
    },
    paper: {
        display: 'flex',
        overflow: 'auto',
        borderRadius: "13px",
        flexDirection: 'column',
        width: "100%",
        textAlign: "left",
        textTransform: "none",
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
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
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
        marginTop: "20px"
    },
    timing: {
        float: "right"
    },
    dialogTitle: {
        fontWeight: 700,
        fontSize: "13px",
        color: "#A5A5A5",
        marginTop: "10px"
    },
    modalContent: {
        padding: "20px"
    }
}));


export default function EventModal(props) {

const classes = useStyles();


  return (
    <React.Fragment>

        <Dialog
            open={props.open}
            classes={{paper: classes.paper}}
            onClose={props.closeModal}>
            <div className={classes.modalContent}>
            <DialogTitle>
                <Typography className={classes.dialogTitle} onClose={props.closeModal}>
                    Event
                </Typography>
            </DialogTitle>
                <DialogContent>
                    <Grid container spacing={6}>
                        <Grid item xs={12} sm={7}>
                            <Typography className={classes.eventTitle}>{props.title}</Typography>
                            <Typography className={classes.eventDescription}>{props.description}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Typography className={classes.eventSubtitle}>{`${props.presenter},`}</Typography>
                            <Typography className={classes.eventSubtitle}>{props.organization}</Typography>
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
                    <DialogActions className={classes.dialogBottom}>
                        <Grid container className={classes.timing} xs={12} sm={3} spacing={0}>
                            <Grid item xs={4} sm={12}>
                                <EventTime time={props.dateInUserTimeZone}/>
                            </Grid>

                            <Grid item xs={3} sm={12}>
                                <Duration duration={props.duration}/>
                            </Grid>
                        </Grid>
                        {/*<Button autoFocus onClick={props.closeModal} color="primary">*/}
                        {/*    Save changes*/}
                        {/*</Button>*/}
                    </DialogActions>
        </Dialog>



    </React.Fragment>
  );

}
