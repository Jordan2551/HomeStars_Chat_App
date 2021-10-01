class ApplicationController < ActionController::Base
    protect_from_forgery unless: -> { request.format.json? }
    
    include ActionController::MimeResponds
    
    respond_to :json

    rescue_from ActiveRecord::RecordNotFound do |exception|
        render json: {errors:{content: [exception]}}, status: 404
    end

    def index
    end

end
