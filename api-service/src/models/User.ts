import { DB } from '../DB'
import { Sequelize, DataTypes, Model } from 'sequelize';

export class User extends Model {}

User.init({
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
});
