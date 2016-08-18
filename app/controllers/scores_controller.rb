class ScoresController < ApplicationController
  


  
get '/new/?' do
    @page_title = "Divot - Scores"
    erb :score
  end

 get '/render/:id' do |id|
    score = Score.find_by id: id
    # binding.pry
    if score
      @score = score
    else
      p "no course with this id found"
      { status: "error", message: "no street by that id found"}.to_json
    end
  end

#
  # GET /:id
  ####
  get '/:id/?' do |id|
    # Returns individual score info 
    score = Score.find_by id: id
    if score
      score.to_json
    else
      p "no course with this id found"
      { status: "error", message: "no street by that id found"}.to_json
    end
  end

  get '/?' do
    # Return list of all scores
    begin
      scores = Score.all 
      content_type :json
      scores.to_json 
    rescue ActiveRecord::RecordNotFound
      content_type :json
      [].to_json
    end
  end

post '/?' do
    # Create new Score
    score = Score.create date: params["date"], coursename: params["coursename"], courselocation: params["courselocation"], shot: params["shot"]
    p score
    erb :score_history
  end
end

 

# score = Scores.create date: params["date"], coursename: params["coursename"], courselocation: params["courselocation"], shot: params["shot"]
