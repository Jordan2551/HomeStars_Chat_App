Rails.application.routes.draw do
  root to: "application#index"

  devise_for :users

  # Routing scheme: /api/v1 for all of our public API URIs
  namespace :api do
    namespace :v1 do 
        resources :channels, only: [:index, :show] do
          get "messages", to: "messages#index_channel"
          post "users/:user_id/messages", to: "messages#create"
        end
        get "users/:user_id/messages", to: "messages#index_user"
      end
    end


    # Any unfound routes: direct to the index page
    get "*path", to: "application#index", via: :all

end
