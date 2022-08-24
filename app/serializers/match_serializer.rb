class MatchSerializer < ActiveModel::Serializer
  attributes :id, :sender_contact_id, :receiver_contact_id, :match_code
end
