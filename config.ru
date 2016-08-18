ENV['RACK_ENV'] ||= 'development'

require 'bundler'
Bundler.require :default, ENV['RACK_ENV'].to_sym

ActiveRecord::Base.establish_connection(
    :adapter => 'sqlite3',
    :database => 'db.sqlite3'
  )

# Require models
require './app/models/user'
require './app/models/score'
require './app/models/course'


# Require controllers and middleware
require './app/controllers/application_controller'
require './app/controllers/home_controller'
require './app/controllers/users_controller'
require './app/controllers/register_controller'
require './app/controllers/courses_controller'
require './app/controllers/find_controller'
require './app/controllers/scores_controller'




map('/users')    { run UsersController }
map('/scores')   { run ScoresController }
map('/courses')  { run CoursesController }
map('/find')     { run FindController }
map('/register') { run RegisterController }
map('/')         { run HomeController }


