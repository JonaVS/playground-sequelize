import { sequelizeConnection } from "../db/config.js";
import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";

class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
}

Todo.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {sequelize: sequelizeConnection , tableName: "todos"});


export default Todo