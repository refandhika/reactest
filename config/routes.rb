Rails.application.routes.draw do
  get '/' => "main#index", as: :root
  get '/tictactoe' => "main#tictactoe", as: :tictactoe
  get '/simpleclock' => "main#simpleclock", as: :simpleclock
  get '/profile' => "main#profile", as: :profile
  get '/forms' => "main#forms", as: :forms
  get '/temperature' => "main#temperature", as: :temperature
  get '/products' => "main#products", as: :products
  get '/loginform' => "main#loginform", as: :loginform
  get '/datetime' => "main#datetime", as: :datetime
  get '/testenv' => "main#testenv", as: :testenv

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
