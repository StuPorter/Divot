class CoursesController < ApplicationController
  #
  # GET '/new'
  ####
  get '/new/?' do
    if session[:is_logged_in] 
      erb :new_course
    else 
      @message = "You are not logged in"
      @page_title = "myStreet - Home Page"
      erb :home
    end
  end
  
  get '/render/:id' do |id|
    course = Course.find_by id: id


    # binding.pry
    if course
      @course = course
      erb :course
    else
      p "no course with this id found"
      { status: "error", message: "no street by that id found"}.to_json
    end
  end


  #
  # GET /:id
  ####
  get '/:id/?' do |id|
    # Returns individual course info 
    course = Course.find_by id: id
    if course
      course.to_json
    else
      p "no course with this id found"
      { status: "error", message: "no street by that id found"}.to_json
    end
  end
  
  #
  # PATCH /:id
  #####
  patch '/:id/?' do |id|
    course = Course.find_by id: id
    if course
      course.update name: params['name'] || course['name'], address: params['location'] || course['difficulty']
      {status: 'ok', message: 'course updated'}.to_json
    else
      {status: 'error', message: 'course was not found'}.to_json
    end
  end

  #
  # DELETE '/;id'
  #####
  delete '/:id/?' do |id|
    # Delete a single course
    course = Course.find_by id: id
    if course
      course.destroy
      { status: "ok", message: "Course deleted"}.to_json
    else
      { status: "error", message: "Could not delete course"}.to_json
    end
  end


  #
  # GET '/'
  ####
  get '/?' do
    # Return list of all courses
    begin
      courses = Course.all 
      content_type :json
      courses.to_json 
    rescue ActiveRecord::RecordNotFound
      content_type :json
      [].to_json
    end
  end
  #
  # POST '/'
  ######
  post '/new/?' do
    # Create new course
    course = Course.create name: params["name"], location: params["location"], img: params["img"], difficulty: params["difficulty"], about: params["about"]
    erb :profile
  end
end

