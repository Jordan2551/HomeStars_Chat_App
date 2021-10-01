import consumer from "./consumer";

// consumer.disconnect()// DC CONSUMER SOCKET

// Create a consumer instance of chat_channel that facilities creating a websocket connection, information receiving and disconnection
class ChatChannelSub{
    constructor(channelId, addMessage){
        this.sub = consumer.subscriptions.create({channel: "ChatChannel",  channel_id: channelId},
            {
                disconnected: () => {
                },
                received: (data) => {
                    addMessage(data.data);
                }
            }
         )
        }

        unsubscribe(){
            this.sub.unsubscribe();
        }

}

export default ChatChannelSub;
