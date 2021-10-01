import React, { useEffect, useState } from "react";
import axios from "axios";
import Messages from "./Messages";
import APIWrapper from "../../helpers/apiWrapper";
import {API_PATH} from "../../helpers/consts";
import { Typography } from "@mui/material";

const UserMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(async () => {
        const result = await APIWrapper.handleAPIRequest(() => axios.get(`${API_PATH}/users/messages`));
        setMessages(result);
    }, []);

    return (
        <>
            <Typography component="h1" variant="h3" textAlign="center">Message History (All Channels)</Typography>
            <Messages data={messages}/>
        </>
    )
}

export default UserMessages
