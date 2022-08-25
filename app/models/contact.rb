class Contact < ApplicationRecord
    belongs_to :user
    has_many :contact_ratings
    has_many :items, through: :contact_ratings
    has_many :matches, :foreign_key => 'sender_contact_id'
    has_many :matches, :foreign_key => 'recipient_contact_id'
end
