import { Sequelize, DataTypes, Model } from 'sequelize';
import { DB } from '../DB'

export class Channel extends Model {
  id: string;
  name: string;
  private: boolean;
  automatic: boolean;
  created_at: Date;
  updated_at: Date;
}

Channel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  private: {
    type: DataTypes.BOOLEAN,
  },
  automatic: {
    type: DataTypes.BOOLEAN,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
}, {
  sequelize: DB.sequelize,
  tableName: 'channels',
  modelName: 'Channel',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: false,
});
