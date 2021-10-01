require "test_helper"

class ChannelTest < ActiveSupport::TestCase
  test "should not save without fields" do
    channel = Channel.new
    assert_not channel.save, "Saved channel without fields"
  end

  test "should not save validation errors" do
    channel = Channel.new(name: '', image: '')
    assert_not channel.save

    channel = Channel.new(name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', image: 'https://i.picsum.photos/id/181/200/200.jpg?hmac=hxgS3WEn2EsuxbTrdq37OVbnajtIHlPXzTKW0X_Gu-s')
    assert_not channel.save
  end

  test "should save with required fields" do
    channel = Channel.new(name: "Appliance Repair", image: "https://i.picsum.photos/id/181/200/200.jpg?hmac=hxgS3WEn2EsuxbTrdq37OVbnajtIHlPXzTKW0X_Gu-s")
    assert channel.save
  end

end
