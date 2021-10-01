import React, {useState, useEffect} from "react";
import axios from "axios";
import { Route, useHistory, useParams } from "react-router";
import Messages from "../Messages/Messages";
import Chat from "../Chat/Chat";
import APIWrapper from "../../helpers/apiWrapper";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import { Typography } from "@mui/material";
import {API_PATH} from "../../helpers/consts";
import ChatChannelSub from "../../channels/chat_channel";

const Channel = (props) => {
    const {classes} = props;

    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const {id} = useParams();

    // Get initial data for channel (channel name, messages)
    useEffect(async () => {
        let result = await APIWrapper.handleAPIRequest(() => axios.get(`${API_PATH}/channels/${id}/messages`));
        setMessages(result);

        result = await APIWrapper.handleAPIRequest(() => axios.get(`${API_PATH}/channels/${id}`));
        const {name, image} = result.attributes
        setName(name);
        setImage(image);
    }, [])

    useEffect(async () => {
        //Subscribe to the chat channel via websocket
        const sub = new ChatChannelSub(id, addMessage);

        //Disconnect the subscription for this socket
        return function cleanup(){
            sub.unsubscribe();
        }
    })

    // Add message dynamically (to be used with messages fetched by sockets)
    const addMessage = (data) => {
        setMessages([data, ...messages]);
    }

    return(
        <div style={{textAlign: "center"}}>
            <Typography component="h1" variant="h3">Welcome to the {name} channel!</Typography>
            <Messages fullHeight={false} data={messages} showChannel={false} />
            <Chat channelId={id}  />
        </div>
    )
} 


export default withStyles(styles)(Channel);