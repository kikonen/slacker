import { Sequelize, DataTypes, Model } from 'sequelize';
import { DB } from '../DB'
import { User } from './User'
import { Channel } from './Channel'

export class ChannelMember extends Model {}

ChannelMember.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  channel_id: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'channel_id',
    references: {
      model: Channel,
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      model: User,
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
  tableName: 'channel_members',
  modelName: 'ChannelMember',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: false,
});

Channel.belongsToMany(User, { as: 'users', through: ChannelMember, foreignKey: 'channel_id' });
User.belongsToMany(Channel, { as: 'channels', through: ChannelMember, foreignKey: 'user_id' });
