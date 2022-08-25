class MatchSerializer < ActiveModel::Serializer
  attributes :id, :sender_contact_id, :recipient_contact_id, :match_code
end
