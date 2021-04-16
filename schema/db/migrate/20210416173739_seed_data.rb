class SeedData < ActiveRecord::Migration[6.1]
  ROLES = [
    {
      name: 'User',
      admin: false,
    },
    {
      name: 'Admin',
      admin: true,
    },
  ]

  def up
    ROLES.each do |role|
      sql = ActiveRecord::Base.sanitize_sql(["insert into roles(name, admin) values (:name, :admin)", name: role[:name], admin: role[:admin]])
      execute sql
    end
  end
end
