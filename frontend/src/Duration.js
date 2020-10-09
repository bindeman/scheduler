import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import moment from "moment-timezone";
import Button from "@material-ui/core/Button";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    duration: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "7px",
        color: "#727272",
        minWidth: theme.spacing(8),

    },
    durationText: {
        fontSize: "10px",
    },
    durationIcon: {
        fontSize: "14px",
        margin: "1.5px 3px 1px 0px"
    },

}));

export default function Duration(props) {
    const classes = useStyles();

  return (
    <React.Fragment>
      <ResponsiveContainer>
          <div className={classes.duration}>
              <ScheduleIcon className={classes.durationIcon}/>
              <Typography className={classes.durationText}>
                  {`${props.duration} min`}
              </Typography>
          </div>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
