class CreateRoles < ActiveRecord::Migration[6.1]
  def change
    create_table :roles, id: :uuid do |t|
      t.string :name, null: false
      t.boolean :admin, null: false

      t.timestamps
    end
  end
end
