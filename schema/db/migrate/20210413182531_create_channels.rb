class CreateChannels < ActiveRecord::Migration[6.1]
  def change
    create_table :channels, id: :uuid do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
