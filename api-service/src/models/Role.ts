import { DB } from '../DB'
import { Sequelize, DataTypes, Model } from 'sequelize';

export class Role extends Model {}

Role.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
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
  tableName: 'roles',
  modelName: 'Role',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});
