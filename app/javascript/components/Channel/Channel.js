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
import moment from "moment";

const Channel = (props) => {
    const {classes} = props;

    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [limit, setLimit] = useState(useParams().limit);
    const [offset, setOffset] = useState(useParams().offset);

    const initialTimestamp = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    const {id} = useParams();

    console.log(messages);

    const paginateNext = () => {
        setOffset(offset + 1);
    }

    // Get messsages on mount and when pagination settings (limit, offset are changed)
    useEffect(async () =>{
        const result = await APIWrapper.handleAPIRequest(() => axios.get(`${API_PATH}/channels/${id}/messages/${limit}/${offset}/${initialTimestamp}`));
        setMessages([...messages, ...result]);

    }, [offset]);

    // Get the channel data
    useEffect(async () => {
        const result = await APIWrapper.handleAPIRequest(() => axios.get(`${API_PATH}/channels/${id}`));
        const {name, image} = result.attributes
        setName(name);
        setImage(image);
    }, [])

    // Create a chat channel websocket subscription
    useEffect(async () => {
        //Subscribe to the chat channel via websocket
        const sub = new ChatChannelSub(id, addMessage, editMessage);

        //Disconnect the subscription for this socket
        return function cleanup(){
            sub.unsubscribe();
        }
    }) // TODO:: WHY DOES [] CAUSE AN ISSUE? should't have to render every time

    // Add message dynamically (to be used with messages fetched by sockets)
    const addMessage = (data) => {
        setMessages([data, ...messages]);
    }

    // TODO:: ISSUE MESSAGES EMPTY?
    const editMessage = (data) => {
        console.log("messages", messages);
        setMessages(messages); 
        let editedMessage = messages.find(message => message.id === data.id);

        console.log(editedMessage);
        editedMessage.content = data.attributes.content;
        
        console.log("EDIT MESSAGE");

        console.log(data);
    }

    return(
        <div style={{textAlign: "center"}}>
            <Typography component="h1" variant="h3">Welcome to the {name} channel!</Typography>
            <Messages fullHeight={false} data={messages} showChannel={false} channelId={id} lazyLoad={true} paginateNext={paginateNext}  />
            <Chat channelId={id}  />
        </div>
    )
} 


export default withStyles(styles)(Channel);