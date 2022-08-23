class CreateContactRatings < ActiveRecord::Migration[6.1]
  def change
    create_table :contact_ratings do |t|
      t.integer :contact_id
      t.integer :item_id
      t.integer :rating

      t.timestamps
    end
  end
end
