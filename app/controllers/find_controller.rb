class FindController < ApplicationController
  get '/?' do
    if session[:is_logged_in] == false || session[:is_logged_in] == nil
      @message = "You are not logged in"
      @page_title = "Divot - Home Page"
      erb :home
    else 
      scores = Score.all
      if scores 
        p scores
        @message = "All Scores found"
      else 
        @message = "No Scores found"
      end
      @page_title = "Divot - Find Course"
      erb :find
    end
  end
end
