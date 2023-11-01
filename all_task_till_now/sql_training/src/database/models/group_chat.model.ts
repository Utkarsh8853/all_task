import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../database";
import { User } from './users.model';
import { group } from './groups.model';

console.log('Iniside Group message Model');
export class group_message extends Model {
}

group_message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      }, 
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
          model: group,
          key: 'id'
        }
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
          model: User,
          key: 'id'
        }
      },
      message_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      message_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      tableName: 'group_message',
    }
  );

  User.hasMany(group_message);
  group_message.belongsTo(User, {foreignKey: 'sender_id'})

  group.hasMany(group_message);
  group_message.belongsTo(group, {foreignKey: 'group_id'})

  group_message.sync();