class CreateChannels < ActiveRecord::Migration[6.1]
  def change
    create_table :channels, id: :uuid do |t|
      t.string :name, null: false
      t.boolean :private, null: false
      t.boolean :automatic, null: false

      t.timestamps
    end
  end
end
