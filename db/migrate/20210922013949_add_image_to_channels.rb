class AddImageToChannels < ActiveRecord::Migration[6.1]
  def change
    add_column :channels, :image, :string
  end
end
