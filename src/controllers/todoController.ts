import { CreateTodoDTO, TodoDTO } from "../dtos/todoDtos.js"
import * as todoService from '../db/services/todo/todoService.js'
import { Result } from "../types/Result.js";

export const getAll = async():Promise<Result<TodoDTO[]>> => {
    return await todoService.getAll();
}

export const getById = async(id: number):Promise<Result<TodoDTO | null>> => {
    return await todoService.getById(id);
}

export const create = async(payload: CreateTodoDTO): Promise<Result<TodoDTO | null>> => {
    return await todoService.create(payload);
}

export const deleteById = async(id: number): Promise<Result<number>> => {
    return await todoService.deleteById(id);
}