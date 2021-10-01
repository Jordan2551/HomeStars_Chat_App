
class UsersController < ApplicationController
    before_action :authenticate_user!

    # GET /api/v1/users/channels - Get all the channels the logged-in user has joined
    def index_channel
        user = current_user
        channels = user.channels
        render json: ChannelSerializer.new(channels).serialized_json
    end

    # POST /api/v1/users/channels/:channel_id - Add a new channel to the logged-in user
    def create_channel
        user = current_user
        channel = Channel.find(params[:channel_id])

        # Only add the channel if it doesn't exist for the user
        unless user.channels.include?(channel) 
            user.channels << Channel.find(params[:channel_id])
        end

        render json: ChannelSerializer.new(Channel.find(params[:channel_id])).serialized_json
    end

    # DELETE /api/v1/users/channels/:channel_id - Add a new channel to the logged-in user
    def destroy_channel
        user = current_user
        user.channels.delete(params[:channel_id])
        render json: { message: "Channel deleted successfully from user"}
    end
end
