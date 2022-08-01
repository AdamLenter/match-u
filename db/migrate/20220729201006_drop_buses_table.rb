class DropBusesTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :buses
  end
end
