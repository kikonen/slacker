class CreateChannelState < ActiveRecord::Migration[6.1]
  def change
    create_table :channel_states, id: :uuid do |t|
      t.integer :offset, null: false

      t.timestamp :created_at, null: false, default: -> { 'now()' }
      t.timestamp :updated_at, null: false, default: -> { 'now()' }
    end

    add_updated_at_trigger(:channel_states)

    add_reference(
      :channel_states,
      :user,
      null: false,
      foreign_key: true,
      type: :uuid,
      index: { name: 'idx_user_channel_state' })
  end
end
