require 'database_cleaner/active_record'
require "test_helper"

class MessageTest < ActiveSupport::TestCase

  DatabaseCleaner.strategy = :truncation

  setup do
    @channel = Channel.create(name: "Appliance Repair", image: "https://i.picsum.photos/id/181/200/200.jpg?hmac=hxgS3WEn2EsuxbTrdq37OVbnajtIHlPXzTKW0X_Gu-s")
    @user = User.create(email: "bobdoe@gmail.com", password: "123456")
  end

  teardown do 
    DatabaseCleaner.clean
  end

  test "should not save without fields" do
    message = Message.new
    assert_not message.save, "Saved message without fields"
  end

  test "should not save validation errors" do
    message = Message.new(content: '', channel_id: 100, user_id: 200)
    assert_not message.save

    message = Message.new(content: 'Hello world', channel_id: 100, user_id: 200)
    assert_not message.save

    message = Message.new(content: 'Hello world', channel_id: @channel.id, user_id: 200)
    assert_not message.save

    message = Message.new(content: 'Hello world', channel_id: 100, user_id: @user.id)
    assert_not message.save
  end

  test "should save message with required fields" do
    message = Message.new(content: "Hello world", channel_id: @channel.id, user_id: @user.id)
    assert message.save
  end
end
