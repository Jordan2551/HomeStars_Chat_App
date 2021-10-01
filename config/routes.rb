Rails.application.routes.draw do
  root to: "application#index"
  mount ActionCable.server => '/cable'

  # Routing scheme: /api/v1 for all public API URIs
  scope :api, defaults: {format: :json} do
    scope :v1, defaults: {format: :json} do 

        devise_for :users

        scope :users do 
          get "messages", to: "messages#index_user"
          get "channels", to: "users#index_channel"
          post "channels/:channel_id", to: "users#create_channel"
          delete "channels/:channel_id", to: "users#destroy_channel"
        end

        resources :channels, only: [:index, :show] do
          get "messages", to: "messages#index_channel"
          post "users/messages", to: "messages#create"
        end
      end
    end


    # Any unfound routes: direct to the index page
    get "*path", to: "application#index", via: :all

end
