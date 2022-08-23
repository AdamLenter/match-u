class ContactSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :contact_ratings

  belongs_to :user
  has_many :contact_ratings
  has_many :items, through: :contact_ratings
  has_many :categories, through: :contact_ratings
end
