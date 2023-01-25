import { CreateTodoDTO, TodoDTO } from "../../../dtos/todoDtos.js";
import { Result } from "../../../types/Result.js";
import * as todoDal from "../../dal/todoDal.js";
import { toTodoDto } from "./todoDtoMappers.js";

export const getAll = async ():Promise<Result<TodoDTO[]>> => {
  const dbResult = await todoDal.getAll()
  const todosDTOs = dbResult.data.map(toTodoDto)

  return {success: dbResult.success, data: todosDTOs}
}

export const getById = async (id: number):Promise<Result<TodoDTO | null>> => {
  const dbResult = await todoDal.getById(id);
  return {
    ...dbResult,
    data: (dbResult.success && dbResult.data) ? toTodoDto(dbResult.data!) : null
  };
}

export const create = async (todo: CreateTodoDTO): Promise<Result<TodoDTO | null>> => {
  const dbResult = await todoDal.create(todo);
  return {
    ...dbResult,
    data: dbResult.success ? toTodoDto(dbResult.data!) : null
  };
};
