import React from "react";
import Message from "components/Message/Message";
import { Button, IconButton, Tooltip } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Messages = ({data, fullHeight, showChannel, lazyLoad, paginateNext}) => {

    const handleGetNextMessages = async (e) => {
        if(lazyLoad)
            paginateNext();
    }

    return(
        <>
            <div style={{height: fullHeight ? 'inherit' : '500px', overflowY: 'scroll'}}>
                {
                    data.map(({id, attributes}, key) => {
                        const {content, user, channel, created_at} = attributes;
                        return(
                            <Message 
                                id={id}
                                key={key} 
                                content={content} 
                                from={user.email} 
                                channel={channel.name}
                                channelId={channel.id}
                                timestamp={created_at}
                                showChannel={showChannel}
                            />
                        )
                    })
                }
            </div>
            <Button color="secondary" onClick={handleGetNextMessages} endIcon={<NavigateNextIcon/>}>Next Messages</Button>
        </>
    )
} 

Messages.defaultProps = {
    fullHeight: true,
    showChannel: true,
    lazyLoad: false,
}

export default Messages;
