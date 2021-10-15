import { Button, Chip, Container, TextField, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import APIWrapper from "../../helpers/apiWrapper";
import axios from 'axios';
import { API_PATH } from "../../helpers/consts";

const Message = (props) => {
    const {classes, id, content, from, timestamp, channel, channelId, showChannel, user} = props;

    const [editing, setEditing] = useState(false);
    const [editContent, setEditContent] = useState(content);

    const getEditingComponents = () => {
        if(isMyMessage(from, user.email)){
            if(editing){
                return <Button variant="contained" disabled={editContent.length === 0} size="small" onClick={saveMessage} style={{marginLeft: 'auto'}} endIcon={<SaveIcon/>}>Save Message</Button>;
            }else{
                return <Button variant="contained" size="small" onClick={() => setEditing(true) } style={{marginLeft: 'auto'}} endIcon={<ModeEditIcon/>}>Edit Message</Button>;
            }
        }
    }

    const isMyMessage = (email1, email2) => {
        return email1 === email2;
    }

    const saveMessage = async () => {
        const body = {
            message: {
             content: editContent,
             channel_id: channelId,
            }    
        }

        const result = await APIWrapper.handleAPIRequest(() => axios.put(`${API_PATH}/channels/${channelId}/users/messages/${id}}`, body));
    }

    return(
    <div className={classes.messageContainer}>
            {
                showChannel && (
                    <Typography component="p" fontWeight="bold">Channel: {channel}</Typography>
                )
            }
            { 
                editing ? // For editing mode display a textfield
                    <> 
                        <Typography component="p">@ {timestamp}</Typography>
                        <TextField fullWidth value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                        <Typography component="p"> Sent by: { isMyMessage(from, user.email) ? "Me" : from}</Typography>
                    </>
                : // Otherwise, display a chip
                    <> 
                        <Typography component="p">@ {timestamp}</Typography>
                        <Chip color={isMyMessage(from, user.email) ? "secondary" : "primary"} label={content} style={{textAlign: 'left'}}/>
                        <Typography component="p"> Sent by: { isMyMessage(from, user.email) ? "Me" : from}</Typography>
                    </>
            }
            {getEditingComponents()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return({
        user: state.user.user,
    });
}

export default connect(mapStateToProps)(withStyles(styles)(Message));