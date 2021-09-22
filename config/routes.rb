Rails.application.routes.draw do
  resources :channels do 
    resources :messages
  end

  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # TODO:: NOT REQUIRED
  root to: "application#index"
end
