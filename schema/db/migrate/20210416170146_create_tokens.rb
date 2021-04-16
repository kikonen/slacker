class CreateTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :tokens, id: :uuid do |t|
      t.string :token, null: false

      t.timestamp :created_at, null: false, default: -> { 'now()' }
      t.timestamp :updated_at, null: false, default: -> { 'now()' }

      t.index [:token], unique: true
    end

    add_updated_at_trigger(:tokens)

    add_reference(
      :tokens,
      :user,
      null: false,
      foreign_key: true,
      type: :uuid,
      index: { name: 'idx_token_user' })
  end
end
