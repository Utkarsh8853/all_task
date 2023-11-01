import { Sequelize ,DataTypes, Model} from "sequelize";

const sequelize = new Sequelize('try','postgres', '      ', {
    host: '192.168.2.175',
    dialect: 'postgres'
  });
console.log('////////////////');


console.log('Iniside User Model');
export class User extends Model {
    
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
    }
  );
  User.sync({force:true});

  export default sequelize;