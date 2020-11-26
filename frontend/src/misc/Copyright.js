import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(() => ({
    copyright: {
        fontSize: "10px",
        color: "#B0B0B0",
        position: "relative",
        bottom: "-20px"
    }
}));


export default function Copyright() {
    const classes = useStyles();
    return (
        <p className={classes.copyright} align="center">
            {`Copyright © ${new Date().getFullYear()} `}
            <Link color="inherit" href="http://theglobalseal.com">
                The Global Seal.
            </Link>{' '}

            {'All rights reserved.'}
        </p>
    );
}



