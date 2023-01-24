import { CreateTodoDTO, TodoDTO } from "../../../dtos/todoDtos.js";
import { Result } from "../../../types/Result.js";
import * as todoDal from "../../dal/todoDal.js";
import { toTodoDto } from "./todoDtoMappers.js";

export const getAll = async ():Promise<Result<TodoDTO[]>> => {
  const dbResult = await todoDal.getAll()
  const todosDTOs = dbResult.data.map(toTodoDto)

  return {sucess: dbResult.sucess, data: todosDTOs}
}

export const getById = async (id: number):Promise<Result<TodoDTO | null>> => {
  const dbResult = await todoDal.getById(id);
  return {
    ...dbResult,
    data: (dbResult.sucess && dbResult.data) ? toTodoDto(dbResult.data!) : null
  };
}

export const create = async (todo: CreateTodoDTO): Promise<Result<TodoDTO | null>> => {
  const dbResult = await todoDal.create(todo);
  return {
    ...dbResult,
    data: dbResult.sucess ? toTodoDto(dbResult.data!) : null
  };
};
