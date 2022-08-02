Rails.application.routes.draw do
  
  resources :contacts
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  get '/contacts', to: 'contacts#index'

  post '/login', to: 'sessions#create'
  post '/users', to: 'users#create'

  delete "/logout", to: "sessions#destroy"
 
end
