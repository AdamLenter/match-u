class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :category

  belongs_to :category
  has_many :contact_ratings
  has_many :contacts, through: :contact_ratings
end
