class Item < ApplicationRecord
    belongs_to :category
    has_many :contact_ratings
    has_many :contacts, through: :contact_ratings
end
