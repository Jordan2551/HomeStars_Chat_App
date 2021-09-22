class CreateChannelsUsersJoinTable < ActiveRecord::Migration[6.1]
  def change
    create_join_table :channels, :users do |t|
      t.index :channel_id
      t.index :user_id
    end
  end
end
