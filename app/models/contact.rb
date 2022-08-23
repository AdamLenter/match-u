class Contact < ApplicationRecord
    belongs_to :user
    has_many :contact_ratings
    has_many :items, through: :contact_ratings
end
