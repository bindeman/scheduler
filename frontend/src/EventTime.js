import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import moment from "moment-timezone";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    eventTime: {
        backgroundColor: "#658546",
        boxShadow: "none",
        color: "#fff",
        textTransform: "lowercase",
        padding: "2px 8px 2px 8px",
        borderRadius: "3px",
        letterSpacing: "-0.28px",
        fontWeight: 700,
        marginTop: "3px",
        marginRight: "3px",
        fontSize: "11px",
        opacity: "1.0",
        "&:disabled":  {
            backgroundColor: "red",
            color: "purple"
        },
        "&:hover": {
            backgroundColor: "#658546",
            boxShadow: "none",
        },

    },
    pastEvent: {
        opacity: "0.20"
    }


}));



export default function EventTime(props) {
    const classes = useStyles();

  return (
    <React.Fragment>
          <Button size="large"
                  className="startTime"
                  variant="contained"
                  disableRipple={true}
                  disabled={false}
                  className={clsx(classes.eventTime, props.eventStatus === "past" && classes.pastEvent)}>
              {moment(props.time).format('LT')}
          </Button>
    </React.Fragment>
  );
}
