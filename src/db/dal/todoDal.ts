import { CreateTodoDTO } from "../../dtos/todoDtos.js";
import Todo from "../../models/Todo.js";
import { Result } from "../../types/Result.js";

export const getAll = async ():Promise<Result<Todo[]>> => {
  let todos: Todo[] = [];
  let sucess = true

  try {
    todos = await Todo.findAll();
  } catch (error) {
    sucess = false
    console.log("An error ocurred while fetching the Todo entities");
  }

  return {sucess, data: todos}
};

export const create = async (todo: CreateTodoDTO): Promise<Result<Todo | null>> => {
  let createdTodo: Todo | null = null;
  let sucess = true;
  
  try {
    createdTodo = await Todo.create(todo);
  } catch (error) {
    console.log("An error ocurred while creating the Todo entity");
    sucess = false;
  }

  return {sucess, data: createdTodo}
};
