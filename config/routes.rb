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
  get '/match_code/:match_code', to: 'matches#find_by'
  get '/pending_matches/:sender_contact_id', to: 'matches#pending_matches'

  post '/login', to: 'sessions#create'
  post '/users', to: 'users#create'
  post '/rating', to: 'contact_ratings#create'
  post '/matches', to: 'matches#create'

  patch '/matches/:id', to: 'matches#update'

  delete "/logout", to: "sessions#destroy"
 
end
