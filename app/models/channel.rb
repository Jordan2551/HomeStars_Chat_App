class Channel < ApplicationRecord
    has_and_belongs_to_many :users
    has_many :messages
    validates :name, presence: true, length: { minimum: 5, maximum: 50}
    validates :image, presence: true
end
