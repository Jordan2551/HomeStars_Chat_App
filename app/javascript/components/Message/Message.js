import { Chip, Container, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import styles from "./styles";

const Message = (props) => {
    const {classes, content, from, timestamp, channel, showChannel} = props;

    return(
    <div className={classes.messageContainer}>
            {
                showChannel && (
                    <Typography component="p" fontWeight="bold">Channel: {channel}</Typography>
                )
            }
            <Typography component="p">@ {timestamp}</Typography>
            <Chip color="primary" label={content} style={{textAlign: 'left'}}/>
            <Typography component="p"> Sent by: {from}</Typography>
        </div>
    )
}

export default withStyles(styles)(Message);