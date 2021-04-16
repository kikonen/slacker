class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events, id: :uuid do |t|
      t.string :type, null: false
      t.string :content, null: false

      t.timestamps
    end

    add_reference(
      :events,
      :channel,
      null: false,
      foreign_key: true,
      type: :uuid,
      index: { name: 'idx_event_channel' })

    add_reference(
      :events,
      :user,
      null: false,
      foreign_key: true,
      type: :uuid,
      index: { name: 'idx_event_user' })
  end
end
