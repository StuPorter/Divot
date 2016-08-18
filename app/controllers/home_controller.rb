class HomeController < ApplicationController
  
  get '/logout/?' do
    session[:is_logged_in] = false 
    session[:user_id] = nil
    redirect '/'
  end


  get '/?' do

    if session[:is_logged_in] == false || session[:is_logged_in] == nil
      @message = "Enter username and password"
      @page_title = "Divot - Home Page"
      erb :home
    else 
       user = User.find_by id: params[:user_id]
       @user = user
      @page_title = "Divot - Profile"
      erb :profile
    end
  end
  
  post '/?' do
    # Returns individual user info 
    user = User.find_by username: params["username"]
    if user
      password = BCrypt::Password.new user.password
      if password == params['password']
      # "Your username was #{user.username}"
        session[:is_logged_in] = true
        session[:user_id] = user.id
        @page_title = "Divot - Profile"
        erb :profile
      else 
        @page_title = "Divot - Home Page"
        @message = "Wrong password"
        erb :home
      end

    else
      @page_title = "Divot - Home Page"
      @message = "Wrong username"
      erb :home
    end
  end


 

end

