import { Sequelize, DataTypes, Model } from 'sequelize';
import { DB } from '../DB'

export class Channel extends Model {}

Channel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  private: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  automatic: {
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
  tableName: 'channels',
  modelName: 'Channel',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: false,
});
