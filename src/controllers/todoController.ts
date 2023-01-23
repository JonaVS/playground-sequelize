import { CreateTodoDTO, TodoDTO } from "../dtos/todoDtos.js"
import * as todoService from '../db/services/todo/todoService.js'
import { Result } from "../types/Result.js";

export const getAll = async():Promise<Result<TodoDTO[]>> => {
    return await todoService.getAll();
}

export const create = async(payload: CreateTodoDTO): Promise<TodoDTO | null> => {
    return await todoService.create(payload);
}