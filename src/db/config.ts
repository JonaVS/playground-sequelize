import { config } from "dotenv";
config();
import { Sequelize } from "sequelize";
export const sequelizeConnection = new Sequelize(process.env.MYSQL_URL);