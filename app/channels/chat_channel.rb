class ChatChannel < ApplicationCable::Channel
    # Invoked when a client subscribes to a chat channel successfully
    def subscribed
        stream_from "chat#{params[:channel_id]}"
    end

    def unsubscribed
    end

    def receive(data)
        ActionCable.server.broadcast("chat#{params[:channel_id]}", data)
    end

end