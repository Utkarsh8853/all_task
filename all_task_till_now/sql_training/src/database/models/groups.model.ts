import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import { User } from './users.model';
console.log('Iniside Group Model');
export class group extends Model {
  
}

group.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
          model: User,
          key: 'id'
        }
      },
    },
    {
      sequelize,
      tableName: 'groups',
    }
  );
  User.hasMany(group);
  group.belongsTo(User, {foreignKey: 'created_by'})
  group.sync();

  export default group;