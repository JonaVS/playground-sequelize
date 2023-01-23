import { TodoDTO } from "../../../dtos/todoDtos.js";
import Todo from "../../../models/Todo.js";

export const toTodoDto = (createdDTO: Todo): TodoDTO => {
  const responseDTO: TodoDTO = {
    id: createdDTO.id,
    title: createdDTO.title,
    description: createdDTO.description
  };
  return responseDTO;
};
