class CreateRoles < ActiveRecord::Migration[6.1]
  def change
    create_table :roles, id: :uuid do |t|
      t.string :name, null: false
      t.boolean :admin, null: false, default: false

      t.timestamp :created_at, null: false, default: -> { 'now()' }
      t.timestamp :updated_at, null: false, default: -> { 'now()' }
    end

    add_updated_at_trigger(:roles)
  end
end
