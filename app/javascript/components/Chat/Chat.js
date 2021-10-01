import { Button, TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import React, {useState} from "react"
import APIWrapper from "../../helpers/apiWrapper";
import styles from "./styles";
import axios from "axios";
import {API_PATH} from "../../helpers/consts";
import FormErrors from "../Global/FormErrors";

const Chat = ({classes, channelId}) => {
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const sendMessage = async () => {
        if(message.length > 0){
            setErrors([]);

            const body = {
                message: {
                 content: message,
                 channel_id: channelId,
                }    
            }
            
            const result = await APIWrapper.handleAPIRequest(() => axios.post(`${API_PATH}/channels/${channelId}/users/messages`, body), setErrors);
            setMessage("");
        }
    }

    return (
        <>
            <div className={classes.chatContainer}>
                <TextField 
                    variant="outlined"
                    multiline 
                    placeholder="Type your message..." 
                    onChange={(e) => setMessage(e.target.value)}
                    className={classes.messageBox}
                    value={message}
                />
                <Button 
                    variant="contained" 
                    onClick={sendMessage} 
                    size="large"
                    style={{marginLeft: '5px'}}
                    disabled={message.length === 0}
                >
                    SEND
                </Button>
            </div>
            <FormErrors errors={errors}/>
        </>
    )
}

export default withStyles(styles)(Chat);
