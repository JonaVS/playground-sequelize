import { CreateTodoDTO, TodoDTO } from "../../../dtos/todoDtos.js";
import { Result } from "../../../types/Result.js";
import * as todoDal from "../../dal/todoDal.js";
import { toTodoDto } from "./todoDtoMappers.js";

export const getAll = async ():Promise<Result<TodoDTO[]>> => {
  const dbResult = await todoDal.getAll()
  const todosDTOs = dbResult.data.map(toTodoDto)

  return {sucess: dbResult.sucess, data: todosDTOs}
}

export const create = async (todo: CreateTodoDTO): Promise<TodoDTO | null> => {
  const createdTodo = await todoDal.create(todo);
  if (!createdTodo) return null;
  const todoDto = toTodoDto(createdTodo);

  return todoDto;
};
