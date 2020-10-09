import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import moment from "moment-timezone";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    eventTime: {
        backgroundColor: "#658546",
        boxShadow: "none",
        color: "#fff",
        textTransform: "lowercase",
        padding: "3px 8px 2px 8px",
        borderRadius: "3px",
        letterSpacing: "-0.28px",
        fontWeight: 700,
        marginTop: "3px",
        fontSize: "11px",
        "&:disabled":  {
            backgroundColor: "red",
            color: "purple"
        },
        "&:hover": {
            backgroundColor: "#658546",
            boxShadow: "none",
        }
    },


}));



export default function EventTime(props) {
    const classes = useStyles();

  return (
    <React.Fragment>
      <ResponsiveContainer>
          <Button size="large"
                  className="startTime"
                  variant="contained"
                  disableRipple={true}
                  disabled={false}
                  className={classes.eventTime}>
              {moment(props.time).format('LT')}
          </Button>
      </ResponsiveContainer>
    </React.Fragment>
  );
}