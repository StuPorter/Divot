require 'sinatra/activerecord/rake'

ActiveRecord::Base.establish_connection(
    :adapter => 'sqlite3',
    :database => 'db.sqlite3'
  )

desc "Set up the environment"
task :environment do
  ENV['RACK_ENV'] ||= 'development'
end

namespace :server do
  desc "Start the server"
  task :start => [:environment] do
    exec "rerun rackup"
  end
end

namespace :controller do
  desc "Create a new controller class"
  task :create, [:filename, :controllername] do |t, args|
    File.open("./app/controllers/#{args.filename}.rb", 'w') do |file|
      file.write("class #{args.controllername} < ApplicationController\n# Your code here\nend")
    end
  end
end
