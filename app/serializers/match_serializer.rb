class MatchSerializer < ActiveModel::Serializer
  attributes :id, :sender_contact_id, :recipient_contact_id, :match_code, :match_confirmed

  belongs_to :sender_contact, :class_name => 'Contact'
  belongs_to :recipient_contact, :class_name => 'Contact'
end
