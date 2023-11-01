import { Sequelize } from "sequelize";

const sequelize = new Sequelize('login_data', 'postgres', '      ', {
    host: 'localhost',
    dialect: 'postgres'
  });

  export default sequelize;