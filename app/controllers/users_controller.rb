class UsersController < ApplicationController
  

  
     #
  # GET /current/edit/?
  ####
  get '/current/edit/?' do 
    # Returns individual user info 
    if session[:is_logged_in]
      user = User.find_by id: session[:user_id]
      @current_user = user
      erb :edit_user
    else
      redirect '/'
    end
  end

  #
  # GET /current/?
  ####
  get '/current/?' do 
    # Returns individual user info 
    user = User.find_by id: session[:user_id]
    if user
      user.to_json
    else
      {status:"error",message:"no user logged in"}.to_json
    end
  end


  




  #
  # GET /users/:id
  ####
  get '/:id/?' do |id|
    # Returns individual user info 
    user = User.find_by id: id 
    if user
      user.to_json
    else
      {status:"error",message:"no user by that id found"}.to_json
    end
  end
  
  #
  # PATCH /users/:id
  #####
  patch '/:id/?' do |id|
    #Update a single user
    user = User.find_by id: id
    if user
      user.update username: params['username'] || user['username'], email: params['email'] || user['email'], password: params['password'] || user['password']
      p 'Success'
      redirect '/'
    else 
      { status: "error", message: "Could not find user"}.to_json
    end
  end

  #
  # DELETE
  #####
  delete '/:id/?' do |id|
    # Delete a single user
    user = User.find id: id 
    if user 
      user.destroy
      { status: "ok", message: "User deleted"}.to_json
    else
      { status: "error", message: "Could not delete user"}.to_json
    end
  end

  #
  # GET /users/
  ####
  get '/?' do
    # Return list of all users
    users = User.all 

    if users 
      users.to_json
    else 
      { status: "error", message: "error loading users"}
    end
  end

  #
  # POST /users/
  ######
  post '/?' do
    user = User.find_by username: params["username"]
    if user 
      @message = "username already exists"
      @page_title = "Divot - Register"
      erb :register
    else
      if params["password"] != params['password_confirmation']
        @message = "password fields do not match"
        @page_title = "Divot - Register"
        erb :register
      else 
         # Create new user
        password = BCrypt::Password.create(params["password"])
        p '-----------------------------------------'
        p params
        p '-----------------------------------------'
        user = User.create username: params["username"], password: password, avgscore: params["avgscore"], fullname: params["fullname"], email: params["email"], homecourse: params["homecourse"], img: params["img"]
        if user 
          # if user created, save user to session, render the profile page
          session[:is_logged_in] = true
          session[:user_id] = user.id
          # @page_title = "Divot - Profile"
          # @message = "new user created"
          # erb :profile
          redirect '/'
        else
          # { status: "error", message: "could not create user"}.to_json
          @message = "could not create user"
          @page_title = "Divot - Register"
          erb :register
        end
      end
    end 
  end
end
