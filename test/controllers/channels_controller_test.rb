require 'database_cleaner/active_record'
require "test_helper"

class ChannelsControllerTest < ActionDispatch::IntegrationTest
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
  test "should not get channels without sign in" do
    get "http://localhost:3000/api/v1/channels"
    assert_response 401
  end

  test "should not get user channel without sign in" do
    channel = @channels[0]
    get "http://localhost:3000/api/v1/channels/#{channel.id}"
    assert_response 401
  end

  # TEST 200 SERIES RESPONSES
  test "should get channels with sign in" do
    sign_in @user
    get "http://localhost:3000/api/v1/channels"
    assert_response :success
  end

  test "should get channel with sign in" do
    channel = @channels[0]
    sign_in @user
    get "http://localhost:3000/api/v1/channels/#{channel.id}"
    assert_response :success
  end

end
