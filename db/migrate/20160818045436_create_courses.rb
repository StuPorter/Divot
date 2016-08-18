class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string   :name
      t.string   :location
      t.string   :img
      t.string   :difficulty
      t.string   :about
    end
  end
end
