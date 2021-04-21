import { Sequelize, DataTypes, Model } from 'sequelize';
import { DB } from '../DB'
import { Role } from './Role'

export class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nick: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  status_message: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  salt: {
    type: DataTypes.STRING,
  },
  role_id: {
    type: DataTypes.UUID,
    field: 'role_id',
    references: {
      model: Role,
      key: 'id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  sequelize: DB.sequelize,
  tableName: 'users',
  modelName: 'User',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: false,
});

Role.hasMany(User, {
  foreignKey: 'role_id',
  as: 'users',
});

User.belongsTo(Role, {
  foreignKey: 'role_id'
});
