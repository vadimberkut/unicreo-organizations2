Rails.application.routes.draw do
  root to: 'application#angular'

  resources :organizations, only: [:index, :show, :create, :update, :destroy] do
    resources :attachments, only: [:show, :create] do

    end

  end
end
