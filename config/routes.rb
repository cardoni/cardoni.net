Rails.application.routes.draw do
  get 'static_pages/index'

  resources :posts

  root 'static_pages#index'

end
