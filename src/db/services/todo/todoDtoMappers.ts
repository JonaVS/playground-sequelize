import { TodoDTO } from "../../../dtos/todoDtos.js";
import Todo from "../../../models/Todo.js";
import { toTagDto } from "../tag/tagDtoMappers.js";

export const toTodoDto = (todo: Todo): TodoDTO => {
  const responseDTO: TodoDTO = {
    id: todo.id,
    userId: todo.UserId,
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
    tags: todo.Tags ? todo.Tags.map(toTagDto) : []
  };
  return responseDTO;
};