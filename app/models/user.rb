class User < ActiveRecord::Base
  has_many :score
  has_many :courses
end
