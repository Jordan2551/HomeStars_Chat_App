require 'database_cleaner/active_record'
require "test_helper"

class MessagesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  DatabaseCleaner.strategy = :truncation

  setup do
    @channels = Channel.create([
      {name: "Appliance Repair", image: "https://i.picsum.photos/id/181/200/200.jpg?hmac=hxgS3WEn2EsuxbTrdq37OVbnajtIHlPXzTKW0X_Gu-s"},
      {name: "Plumbing Repair", image: "https://i.picsum.photos/id/1082/200/200.jpg?hmac=3usO1ziO7kCseIG52ruhRigxyk39W_L9eECWe1Hs6fY"}
    ])
    
    @user = User.create(email: "bobdoe@gmail.com", password: "123456")
  end

  teardown do 
    DatabaseCleaner.clean
    sign_out @user 
  end

  # TEST 400 SERIES RESPONSES
  test "should not get channel messages without sign in" do
    get "http://localhost:3000/api/v1/channels/2/messages"
    assert_response 401
  end

  test "should not get channel messages signed in but not joined channel" do
    sign_in @user
    channel = @channels[0]

    get "http://localhost:3000/api/v1/channels/#{channel.id}/messages"
    assert_response 403, "The user is signed in but is able to see messages in the #{channel.name} channel even though they did not join it!"
  end
  
  test "should not leave channel without sign in" do
    channel = @channels[0]
    delete "http://localhost:3000/api/v1/users/channels/#{channel.id}"
    assert_response 401
  end

  test "should not leave channel signed in but not joined channel" do
    sign_in @user
    channel = @channels[0]
    delete "http://localhost:3000/api/v1/users/channels/#{channel.id}"
    assert_response 404
  end
  
  test "should not get user messages without sign in" do
    get "http://localhost:3000/api/v1/users/messages"
    assert_response 401
  end

  test "should not create message without sign in" do
    channel = @channels[0]

    post "http://localhost:3000/api/v1/channels/#{channel.id}/users/messages", params: {message: {content: "hello world", channel_id: channel.id}}
    assert_response 401
  end

  test "should not create message with sign in but not joined channel" do
    sign_in @user
    channel = @channels[0]

    post "http://localhost:3000/api/v1/channels/#{channel.id}/users/messages", params: {message: {content: "hello world", channel_id: channel.id}}
    assert_response 403, "The user was able to create a message in a channel they did not join!"
  end

  # TEST 200 SERIES RESPONSES
  test "should get channel messages with sign in and channel join" do
    sign_in @user
    channel = @channels[0]
    
    # Create the user_channel we wish to get messages for the user and check that it was commited to DB
    assert_difference("User.first.channels.count", 1) do
      post "http://localhost:3000/api/v1/users/channels/#{channel.id}"
    end

    # Check that they are able to get messages for the now joined channel
    get "http://localhost:3000/api/v1/channels/#{channel.id}/messages"
    assert_response :success, "The user was not able to get messages for the channel #{channel.name} even though they joined it"
  end

  test "should leave channel with sign in and user joined channel" do
    sign_in @user
    channel = @channels[0]
    
    # Add channel to user and check change in db
    assert_difference("User.first.channels.count", 1) do
      post "http://localhost:3000/api/v1/users/channels/#{channel.id}"
    end

    # Remove channel from user and check change in db
    assert_difference("User.first.channels.count", -1) do
      delete "http://localhost:3000/api/v1/users/channels/#{channel.id}"
    end

    assert_response :success
  end

  test "should get user messages with sign in" do
    sign_in @user
    get "http://localhost:3000/api/v1/users/messages"
    assert_response :success
  end

  test "should create message with sign in and user joined channel" do
    sign_in @user
    channel = @channels[0]

    # Create the user_channel we wish to create message for
    assert_difference("User.first.channels.count", 1) do
      post "http://localhost:3000/api/v1/users/channels/#{channel.id}"
    end

    post "http://localhost:3000/api/v1/channels/#{channel.id}/users/messages", params: {message: {content: "hello world", channel_id: channel.id}}
    assert_response :success
  end

end
