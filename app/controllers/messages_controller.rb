
class MessagesController < ApplicationController
    before_action :authenticate_user!
    before_action :user_allowed_in_channel, only: [:index_channel, :create]

    # GET /api/v1/channels/:channel_id/messages - Get all messages for channel
    def index_channel
      channel = Channel.find(params[:channel_id])
      messages = channel.messages.order("created_at DESC")

      render json: MessageSerializer.new(messages).serialized_json
    end

    # GET /api/v1/channels/:channel_id/users/messages - Get all messages for logged in user
    def index_user
        user = current_user
        messages = user.messages.order("created_at DESC")

        render json: MessageSerializer.new(messages).serialized_json
    end

    # POST /api/v1/channels/:channel_id/users/messages - Create a new message for logged in user & broadcast persisted message to sockets
    def create
      user = current_user
      message = Message.new(message_params)
      
      if message.save
        message_serialized = MessageSerializer.new(message)

        # Broadcast message to all consumers subscribed to this channel
        ActionCable.server.broadcast("chat#{params[:channel_id]}", message_serialized.serializable_hash)
        
        render json: message_serialized.serialized_json
      else
        render json: {error: message.errors.messages }, status: 422
      end
    end
    
    private 
        def message_params
            params[:message][:user_id] = current_user.id
            params.require(:message).permit(:content, :channel_id, :user_id)
        end

        # Checks if user has permission to invoke channel-related methods
        def user_allowed_in_channel
          unless current_user.channels.exists?(params[:channel_id])
            render json: {errors:{content: ["You must join this channel before you can enter it!"]}}, status: 403
          end
        end

end
