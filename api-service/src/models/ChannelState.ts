import { Sequelize, DataTypes, Model } from 'sequelize';
import { DB } from '../DB'
import { Channel } from './Channel'

export class ChannelState extends Model {
  id: string;
  offset: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

ChannelState.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
  },
  offset: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
}, {
  sequelize: DB.sequelize,
  tableName: 'channel_states',
  modelName: 'ChannelState',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: false,
});

ChannelState.belongsTo(Channel, {
  foreignKey: 'channel_id'
});
