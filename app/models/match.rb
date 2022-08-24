class Match < ApplicationRecord
    validates :match_code, uniqueness: true
end
