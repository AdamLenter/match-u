class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :contact

  has_one :contact
  has_many :contact_ratings
end
