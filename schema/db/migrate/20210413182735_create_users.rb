class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users, id: :uuid do |t|
      t.string :name
      t.string :email
      t.string :password
      t.string :salt
      t.uuid :token

      t.timestamps
    end
  end
end
