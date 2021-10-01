class MessageSerializer
  include FastJsonapi::ObjectSerializer
  include ApplicationHelper
  
  attributes :content, :user, :channel
  
  attribute :created_at do |message|
    normalize_timestamp message.created_at
  end
end
