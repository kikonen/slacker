import { Sequelize, DataTypes, Model } from 'sequelize';
import { DB } from '../DB'

export class Role extends Model {
  id: string;
  name: string;
  admin: boolean;
  created_at: Date;
  updated_at: Date;
}

Role.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
  },
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
  },
  updated_at: {
    type: DataTypes.DATE,
  },
}, {
  sequelize: DB.sequelize,
  tableName: 'roles',
  modelName: 'Role',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: false,
});
