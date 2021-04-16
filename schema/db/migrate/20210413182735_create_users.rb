class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users, id: :uuid do |t|
      t.string :name
      t.string :email, null: false
      t.string :nick
      t.string :status
      t.string :status_message
      t.string :password
      t.string :salt

      t.timestamp :created_at, null: false, default: -> { 'now()' }
      t.timestamp :updated_at, null: false, default: -> { 'now()' }

      t.index [:email], unique: true
    end

    add_updated_at_trigger(:users)

    add_reference(
      :users,
      :role,
      foreign_key: true,
      type: :uuid,
      index: { name: 'idx_user_role' })
  end
end
