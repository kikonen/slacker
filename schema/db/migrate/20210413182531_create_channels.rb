class CreateChannels < ActiveRecord::Migration[6.1]
  def change
    create_table :channels, id: :uuid do |t|
      t.string :name, null: false
      t.boolean :private, null: false, default: false
      t.boolean :automatic, null: false, default: false

      t.timestamp :created_at, null: false, default: -> { 'now()' }
      t.timestamp :updated_at, null: false, default: -> { 'now()' }
    end

    add_updated_at_trigger(:channels)
  end
end
