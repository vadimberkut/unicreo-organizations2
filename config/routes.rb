Rails.application.routes.draw do
  devise_for :users
  root to: 'application#angular'

  resources :organizations, only: [:index, :show, :create, :update, :destroy] do
    resources :attachments, only: [:show, :create]

  end
end
