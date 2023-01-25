import { CreateTodoDTO } from "../../dtos/todoDtos.js";
import Todo from "../../models/Todo.js";
import { Result } from "../../types/Result.js";

export const getAll = async ():Promise<Result<Todo[]>> => {
  let todos: Todo[] = [];
  let success = true

  try {
    todos = await Todo.findAll();
  } catch (error) {
    success = false
    console.log("An error ocurred while fetching the Todo entities");
  }

  return {success, data: todos}
};

export const getById = async (id: number):Promise<Result<Todo | null>> => {
  let todo: Todo | null = null; 
  let success = true
  
  try {
    todo = await Todo.findByPk(id);
  } catch (error) {
    success = false;
    console.log("An error ocurred while fetching the specified Todo entity");
  }
  return {success, data: todo}
}

export const create = async (todo: CreateTodoDTO): Promise<Result<Todo | null>> => {
  let createdTodo: Todo | null = null;
  let success = true;

  try {
    createdTodo = await Todo.create(todo);
  } catch (error) {
    console.log("An error ocurred while creating the Todo entity");
    success = false;
  }

  return {success, data: createdTodo}
};

export const deleleById = async (id: number): Promise<Result<number>> => {
  let deletedRows = -1
  let success = true

  try {
    deletedRows =  await Todo.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    success = false
    console.log("An error ocurred while deleting the specified Todo entity");
  }

  return {success, data: deletedRows }
};
