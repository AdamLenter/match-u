class Match < ApplicationRecord
    validates :match_code, uniqueness: true

    belongs_to :sender_contact, :class_name => 'Contact'
    belongs_to :recipient_contact, :class_name => 'Contact'
end
