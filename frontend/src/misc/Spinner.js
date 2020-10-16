import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStylesCustom = makeStyles(() => ({
  container: {
    width: "100%",
      height: "100%"
  },

    root: {
    position: 'relative',
        margin: "auto",
        width: "30px"
  },
  bottom: {
    color: '#E2E7DC',
  },
  top: {
    color: '#658546',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

function Spinner(props) {
  const classes = useStylesCustom();

  return (
      <div className={classes.root}>
        <CircularProgress
            variant="determinate"
            className={classes.bottom}
            size={30}
            thickness={6}
            {...props}
            value={100}
        />
        <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.top}
            classes={{
              circle: classes.circle,
            }}
            size={30}
            thickness={6}
            {...props}
        />
      </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function LoadingSpinner() {
  const classes = useStyles();

  return (
      <div className={classes.container}>
          <div className={classes.root}>

            <Spinner />
          </div>
      </div>
  );
}
