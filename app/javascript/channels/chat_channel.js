import consumer from "./consumer";

// consumer.disconnect()// DC CONSUMER SOCKET

// Create a consumer instance of chat_channel that facilities creating a websocket connection, information receiving and disconnection
class ChatChannelSub{
    constructor(channelId, addMessage, editMessage){
        this.sub = consumer.subscriptions.create({channel: "ChatChannel",  channel_id: channelId},
            {
                disconnected: () => {
                },
                received: (data) => {
                    // Check the status of message (201 created will append a message while 204 will edit an existing message)
                    const result = data.data;

                    if(result.status == 201)
                        addMessage(result);
                    else if(result.status == 204)
                        editMessage(result);
                }
            }
         )
        }

        unsubscribe(){
            this.sub.unsubscribe();
        }

}

export default ChatChannelSub;
