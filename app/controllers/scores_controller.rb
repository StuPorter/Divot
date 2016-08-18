class ScoresController < ApplicationController
  


  
get '/?' do
    @page_title = "Divot - Scores"
    erb :score
  end

get '/?' do
    # Return list of all scores
    score = Score.all 

    if scores 
      scores.to_json
    else 
      { status: "error", message: "error loading users"}
    end
  end

post '/?' do
    # Create new Score
    score = Score.create date: params["date"], coursename: params["coursename"], courselocation: params["courselocation"], shot: params["shot"]
    p score
    erb :profile
  end
end

 

# score = Scores.create date: params["date"], coursename: params["coursename"], courselocation: params["courselocation"], shot: params["shot"]
