MovieTextAlertPostgres::Application.routes.draw do
  resources :users
  root 'users#new'
  resource :session, only: [:new, :create, :destroy]

  #get '/movies' => 'movies#index'
  get '/upcoming' => 'upcoming#index', as: :upcoming

  # json API
  scope '/api' do
    resources :movies, defaults: { format: :json }
  end

end
