class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.string   :date
      t.string   :coursename
      t.string   :courselocation
      t.integer  :shot
    end
  end
end
