class ChatChannel < ApplicationCable::Channel
    # Invoked when a client subscribes to a chat channel successfully
    def subscribed
        # channel = Channel.find(params[:channel_id])
        stream_from "chat#{params[:channel_id]}"
    end

    def receive(data)
        ActionCable.server.broadcast("chat#{params[:channel_id]}", data)
    end

end