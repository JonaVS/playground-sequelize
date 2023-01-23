import { CreateTodoDTO, TodoDTO } from "../../../dtos/todoDtos.js";
import * as todoDal from "../../dal/todoDal.js";
import { toTodoDto } from "./todoDtoMappers.js";

export const create = async (todo: CreateTodoDTO): Promise<TodoDTO | null> => {
  const createdTodo = await todoDal.create(todo);
  if (!createdTodo) return null;
  const todoDto = toTodoDto(createdTodo);

  return todoDto;
};
