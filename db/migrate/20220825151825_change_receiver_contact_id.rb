class ChangeReceiverContactId < ActiveRecord::Migration[6.1]
  def change
    rename_column :matches, :receiver_contact_id, :recipient_contact_id
  end
end
