
class ChannelsController < ApplicationController
    before_action :authenticate_user!

    # GET /api/v1/channels - Get all channels
    def index
        channels = Channel.all
        render json: ChannelSerializer.new(channels).serialized_json
    end

    # GET /api/v1/channels/:id - Get a channel by id 
    def show
        channel = Channel.find(params[:id])
        render json: ChannelSerializer.new(channel).serialized_json
    end
end
