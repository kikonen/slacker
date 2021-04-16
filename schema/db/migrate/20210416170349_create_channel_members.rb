class CreateChannelMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :channel_members, id: :uuid do |t|
      t.timestamp :created_at, null: false, default: -> { 'now()' }
      t.timestamp :updated_at, null: false, default: -> { 'now()' }
    end

    add_updated_at_trigger(:channel_members)

    add_reference(
      :channel_members,
      :channel,
      null: false,
      foreign_key: true,
      type: :uuid,
      index: { name: 'idx_member_channel' })

    add_reference(
      :channel_members,
      :user,
      null: false,
      foreign_key: true,
      type: :uuid,
      index: { name: 'idx_member_user' })

    add_index :channel_members, [:channel_id, :user_id], unique: true, name: 'idx_members'
  end
end
