import { sequelizeConnection } from "../db/config.js";
import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import Todo from "./Todo.js";
import TodoTag from "./TodoTag.js";

class Tag extends Model<InferAttributes<Tag>, InferCreationAttributes<Tag>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>
}

Tag.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  }
}, {sequelize: sequelizeConnection , tableName: "Tags", paranoid: true});


Todo.belongsToMany(Tag, { through: TodoTag });
Tag.belongsToMany(Todo, { through: TodoTag });

export default Tag