class CreateMatches < ActiveRecord::Migration[6.1]
  def change
    create_table :matches do |t|
      t.integer :sender_contact_id
      t.integer :receiver_contact_id
      t.string :match_code

      t.timestamps
    end
  end
end
