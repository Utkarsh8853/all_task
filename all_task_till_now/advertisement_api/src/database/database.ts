import { Sequelize } from "sequelize";

const sequelize = new Sequelize('advertisement_db', 'postgres', '      ', {
    host: 'localhost',
    dialect: 'postgres'
  });

  export default sequelize;