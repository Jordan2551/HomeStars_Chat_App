import { Chip, Container, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import { connect } from "react-redux";
import styles from "./styles";

const Message = (props) => {
    const {classes, content, from, timestamp, channel, showChannel, user} = props;

    const isMyMessage = (email1, email2) => {
        return email1 === email2;
    }

    return(
    <div className={classes.messageContainer}>
            {
                showChannel && (
                    <Typography component="p" fontWeight="bold">Channel: {channel}</Typography>
                )
            }
            <Typography component="p">@ {timestamp}</Typography>
            <Chip color={isMyMessage(from, user.email) ? "secondary" : "primary"} label={content} style={{textAlign: 'left'}}/>
            <Typography component="p"> Sent by: { isMyMessage(from, user.email) ? "Me" : from}</Typography>
        </div>
    )
}

const mapStateToProps = (state) => {
    return({
        user: state.user.user,
    });
}

export default connect(mapStateToProps)(withStyles(styles)(Message));