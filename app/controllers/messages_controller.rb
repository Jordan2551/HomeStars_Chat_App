class MessagesController < ApplicationController
    before_action :authenticate_user!

    def index
        @messages = Message.where(channel_id: params[:channel_id])
    end

    def new
        @message = Message.new
        @channel = Channel.find(params[:channel_id])
    end

    def show
    end

    def create 
        @message = Message.new(message_params)
        
        if @message.save
            redirect_to messages_path
        else
            redner :new
        end
    end


    private 
        def message_params
            params.require(:message).permit(:content, :user_id, :channel_id)
        end
end
