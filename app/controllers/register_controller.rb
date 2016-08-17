class RegisterController < ApplicationController
  
  get '/?' do
    @message = "Sign Up"
    @page_title = "Divot - Register"
    erb :register
  end
end
