import React, {useEffect, useState} from "react";
import axios from 'axios';
import ChannelPreview from "../Channel/ChannelPreview";
import { Grid } from "@mui/material";
import {API_PATH} from "../../helpers/consts";
import APIWrapper from "../../helpers/apiWrapper";

const Channels = () => {
    const [channels, setChannels] = useState([]);
    const [userChannels, setUserChannels] = useState([]);

    useEffect(async () =>{
        let result = await APIWrapper.handleAPIRequest(() => axios.get(`${API_PATH}/channels`));
        setChannels(result);

        await getUserChannels();
    }, [])

    const getUserChannels = async () => {
        const result = await APIWrapper.handleAPIRequest(() => axios.get(`${API_PATH}/users/channels`));
        setUserChannels(result)
    }

    const userInChannel = (channelId) => {
        if(userChannels){
            return userChannels.find(channel => channel.id === channelId);
        }
        return false;
    }

    const grid = channels.map(({id, attributes}, key) => (
        <Grid key={key} item xs={12} sm={6} lg={4} style={{display: 'flex', justifyContent: 'center'}}>
            <ChannelPreview 
                id={id} 
                attributes={attributes}
                inChannel={userInChannel(id)}
                getUserChannels={getUserChannels}
            />
        </Grid>
    ));

    return(
        <Grid container>
            {grid}
        </Grid>
    );
}

export default Channels;