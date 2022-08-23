class ContactRating < ApplicationRecord
    belongs_to :contact
    belongs_to :item
end
