import React from "react";
import {
    withStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const BootstrapButton = withStyles({
    root: {
        boxShadow: "none",
        textTransform: "none",
        fontSize: 11,
        fontWeight: 700,
        color: "#648540",
        letterSpacing: "-0.25px",
        lineHeight: "14px",
        padding: "9px 26px",
        textAlign: 'center',
        border: "3px solid",
        borderRadius: "18px",
        backgroundColor: "white",
        borderColor: "#648540",
        "&:hover": {
            backgroundColor: "#1C5100",
            borderColor: "#1C5100",
            boxShadow: "none",
            color: "#fff"
        },
        "&:active": {
            boxShadow: "none",
            backgroundColor: "#133600",
            color: "#fff"
            //borderColor: '#648540',
        },
        "&:focus": {
            boxShadow: "0 0 0 0.2rem rgba(65,117,5,.3)"
        },
        "&:disabled": {
            //boxShadow: "0 0 0 0.2rem rgba(65,117,5,.3)",
            color: "#CBCBCB",
            borderColor: "#CBCBCB",
            backgroundColor: "#EAEAEA",
        }
    }
})(Button);

export default function PrimaryButton(props) {

    return (

        <BootstrapButton
            variant="contained"
            color="primary"
            disabled={props.disabled}
            disableRipple
            target={"_blank"}
            href={props.link}
            rel="noopener noreferrer"
            //onClick={props.onClick ? props.onClick : ""}
        >
            {props.text}
        </BootstrapButton>

    );
}
