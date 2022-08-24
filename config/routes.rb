Rails.application.routes.draw do
  
  resources :matches
  resources :contact_ratings
  resources :contacts
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  get '/me/', to: 'users#show'
  
  get '/contacts', to: 'contacts#index'
  get '/items', to: 'items#index'

  post '/login', to: 'sessions#create'
  post '/users', to: 'users#create'
  post '/rating', to: 'contact_ratings#create'
  post '/matches', to: 'matches#create'

  delete "/logout", to: "sessions#destroy"
 
end
