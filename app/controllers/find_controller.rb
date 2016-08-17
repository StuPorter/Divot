class FindController < ApplicationController
  get '/?' do
    @message = "Sign Up"
    @page_title = "Divot - Register"
    erb :find
  end
end
