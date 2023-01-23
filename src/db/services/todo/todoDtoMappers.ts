import { TodoDTO } from "../../../dtos/todoDtos.js";
import Todo from "../../../models/Todo.js";

export const toTodoDto = (todo: Todo): TodoDTO => {
  const responseDTO: TodoDTO = {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt
  };
  return responseDTO;
};