class User < ActiveRecord::Base
  has_many :course
  has_many :group
  has_many :score
end
