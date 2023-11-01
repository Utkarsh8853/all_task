import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import { User } from './users.model';
import { group } from './groups.model';

console.log('Iniside Group member Model');
export class group_member extends Model {
    static hasUser: any;
}

group_member.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
          model: User,
          key: 'id'
        }
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
          model: group,
          key: 'id'
        }
      },
    },
    {
      sequelize,
      tableName: 'group_member',
    }
  );
  
  User.hasMany(group_member);
  group_member.belongsTo(User, {foreignKey: 'user_id'})

  group.hasMany(group_member);
  group_member.belongsTo(group, {foreignKey: 'group_id'})

  group_member.sync();