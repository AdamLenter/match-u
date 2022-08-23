class DropUserRatings < ActiveRecord::Migration[6.1]
  def change
    drop_table :user_ratings
  end
end
