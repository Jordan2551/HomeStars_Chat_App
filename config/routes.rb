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
          get "messages/:limit/:offset/:initial_timestamp", to: "messages#index_channel", defaults: { limit: 1000, offset: 0, initial_timestamp: Time.now}
          post "users/messages", to: "messages#create"
          put "users/messages/:id", to: "messages#edit" 
        end
      end
    end


    # Any unfound routes: direct to the index page
    get "*path", to: "application#index", via: :all

end
