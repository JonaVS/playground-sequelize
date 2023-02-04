import { sequelizeConnection } from "../db/config.js";
import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
} from "sequelize";
import Todo from "./Todo.js";
import Tag from "./Tag.js";

//This model works as a junction table for the many-to-many relation of Todos and Tags
class TodoTag extends Model<InferAttributes<TodoTag>, InferCreationAttributes<TodoTag>> {
  declare TodoId: ForeignKey<Todo['id']>;
  declare TagId: ForeignKey<Tag['id']>;
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>
}

TodoTag.init({
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  }
}, {sequelize: sequelizeConnection , tableName: "TodoTag", paranoid: true});


export default TodoTag