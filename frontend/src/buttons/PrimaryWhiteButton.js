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
        color: "#fff",
        letterSpacing: "-0.25px",
        lineHeight: "14px",
        padding: "9px 26px",
        border: "3px solid",
        borderRadius: "18px",
        backgroundColor: "transparent",
        borderColor: "#fff",
        "&:hover": {
            backgroundColor: "#fff",
            borderColor: "#fff",
            boxShadow: "none",
            color: "#1C5100"
        },
        "&:active": {
            boxShadow: "none",
            backgroundColor: "#AABEA0",
            borderColor: "#fff",
        },
        "&:focus": {
            boxShadow: "0 0 0 0.2rem rgba(211,255,186,.3)"
        }
    }
})(Button);





export default function PrimaryButton(props) {

    return (
        <BootstrapButton
            variant="contained"
            color="primary"
            disableRipple
            target={"_blank"}
            rel="noopener noreferrer"
            href={props.link}
            //onClick={props.onClick ? props.onClick : ""}
        >
            {props.text}
        </BootstrapButton>
    );
}
