class Message < ApplicationRecord
  include MessagesHelper
  
  belongs_to :user
  belongs_to :channel

  validates :content, presence: true, length: {minimum: 5, maximum:10}
end
