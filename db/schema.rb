# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160818045436) do

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.string "img"
    t.string "difficulty"
    t.string "about"
  end

  create_table "scores", force: :cascade do |t|
    t.string  "date"
    t.string  "coursename"
    t.string  "courselocation"
    t.integer "shot"
  end

  create_table "users", force: :cascade do |t|
    t.string  "username"
    t.string  "password"
    t.string  "fullname"
    t.string  "email"
    t.string  "homecourse"
    t.integer "avgscore"
    t.string  "img"
  end

end
