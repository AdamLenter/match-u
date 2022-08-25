class AddMatchConfirmedColumn < ActiveRecord::Migration[6.1]
  def change
    add_column :matches, :match_confirmed, :boolean
  end
end
