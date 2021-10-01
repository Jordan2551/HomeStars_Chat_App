import React from "react";
import Message from "components/Message/Message";

const Messages = ({data, fullHeight, showChannel}) => {
    return(
        <div style={{height: fullHeight ? 'inherit' : '500px', overflowY: 'scroll'}}>
            {
                data.map(({attributes}, key) => {
                    const {content, user, channel, created_at} = attributes;
                    return(
                        <Message 
                            key={key} 
                            content={content} 
                            from={user.email} 
                            channel={channel.name}
                            timestamp={created_at}
                            showChannel={showChannel}
                        />
                    )
                })
            }
        </div>
    )
} 

Messages.defaultProps = {
    fullHeight: true,
    showChannel: true,
}

export default Messages;
