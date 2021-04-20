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
    create_roles
    create_system_user
  end

  def create_roles
    ROLES.each do |role|
      sql = ActiveRecord::Base.sanitize_sql(["insert into roles(name, admin) values (:name, :admin)", name: role[:name], admin: role[:admin]])
      execute(sql)
    end
  end

  def create_system_user
    rs = execute("select id from roles where admin")

    user = {
      name: 'System',
      email: 'system@system',
      role_id: rs.first["id"]
    }

    sql = ActiveRecord::Base.sanitize_sql(["insert into users(name, email, role_id) values (:name, :email, :role_id)", name: user[:name], email: user[:email], role_id: user[:role_id]])
    execute(sql)
  end
end
