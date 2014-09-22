MovieTextAlertPostgres::Application.routes.draw do
  resources :users
  root 'users#new'
  resource :session, only: [:new, :create, :destroy]

    resources :movies

end
