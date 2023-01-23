import { CreateTodoDTO } from "../../dtos/todoDtos.js";
import Todo from "../../models/Todo.js";

export const create = async (todo: CreateTodoDTO): Promise<Todo | null> => {
  let createdTodo:Todo 
  try {
    createdTodo = await Todo.create(todo);
  } catch (error) {
    console.log('An error ocurred while creating the Todo entity')
    return null
  }

  return createdTodo;
};
