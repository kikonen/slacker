class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events, id: :uuid do |t|
      t.string :type, null: false
      t.string :content, null: false

      t.timestamp :created_at, null: false, default: -> { 'now()' }
      t.timestamp :updated_at, null: false, default: -> { 'now()' }
    end

    add_updated_at_trigger(:events)

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
