import { CreateTodoDTO, TodoDTO } from "../dtos/todoDtos.js"
import * as todoService from '../db/services/todo/todoService.js'

export const create = async(payload: CreateTodoDTO): Promise<TodoDTO | null> => {
    if (!Object.keys(payload).length) return null
    return await todoService.create(payload);
}