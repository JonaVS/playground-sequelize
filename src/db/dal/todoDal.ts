import { CreateTodoDTO, UpdateTodoDTO } from "../../dtos/todoDtos.js";
import Todo from "../../models/Todo.js";
import Tag from "../../models/Tag.js";
import { Result } from "../../types/Result.js";
import { sequelizeConnection } from "../config.js";

export const getAll = async ():Promise<Result<Todo[]>> => {
  let todos: Todo[] = [];
  let success = true

  try {
    todos = await Todo.findAll({include: Tag});
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
    todo = await Todo.findByPk(id, {include: Tag});
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
    /*
      A transaction is needed here because many db operations could happen.
      If a single operation fails, a rollback will be executed.
    */
    await sequelizeConnection.transaction(async (todoTransaction) => {
      /*
        UserId is a db FK. 
        The userId field from todo is attached via middleware if valid JWT.
      */
      createdTodo = await Todo.create({...todo, UserId: todo.userId}, {transaction: todoTransaction});
 
      /*
        Creates Tags and populates the TodoTag junction table 
         for the many-to-many relationship between Todos and Tags.
      */
      if (todo.tags && todo.tags.length) {
        /*
          Field used just to sent the createdTodo with the linked Tags later on with the response.
          Populating this manually prevents an extra db call just to query the linked tags with the current createdTodo 
            which would automatically populate the cretedTodo.Tags field
        */
        createdTodo.Tags = [];

        for (const tagName of todo.tags) {
          //Creates or finds Tags inside the Tag table
          let generatedTagResult = await Tag.findOrCreate({where: {
            name: tagName
          }, transaction: todoTransaction},)

          //Stores each tag generated by the db
          createdTodo.Tags.push(generatedTagResult[0]);
        }
        //Populates the junction table TodoTag used for many-to-many relationship
        await createdTodo.addTags(createdTodo.Tags, {
          transaction: todoTransaction,
        });
      }
    });

  } catch (error) {
    console.log("An error ocurred while creating the Todo entity");
    success = false;
    createdTodo = null
  }

  return {success, data: createdTodo}
};

export const deleteById = async (id: number, userId: number): Promise<Result<number>> => {
  let deletedRows = -1
  let success = true

  try {
    deletedRows = await Todo.destroy({
      where: {
        id: id,
        UserId: userId,
      },
    });
  } catch (error) {
    success = false;
    console.log("An error ocurred while deleting the specified Todo entity");
  }

  return {success, data: deletedRows }
};

export const updateById = async (id: number, dataToUpdate: UpdateTodoDTO): Promise<Result<Todo | null>> => {
  let updatedTodo: Todo | null = null
  let success  = true
  let updatedTags = false

  try {
    await sequelizeConnection.transaction(async (updateTodoTransaction) => {
      const todoTarget = await Todo.findByPk(id, {transaction: updateTodoTransaction});

      if (todoTarget && todoTarget.UserId === dataToUpdate.userId) {

        //Updates base fields of a todo.
        updatedTodo = await todoTarget.update(dataToUpdate.todoData, {transaction: updateTodoTransaction});
     
        //-----Todo Linked Tags operations-----
        /*
          Deletes/unlink tags from a todo | Deletes entries in the TodoTag junction table
          An array with the linked tags ids is passed.
        */
        if (dataToUpdate.tags && dataToUpdate.tags.tagsToRemove) {
          await todoTarget.removeTags(dataToUpdate.tags.tagsToRemove, {transaction: updateTodoTransaction})
          updatedTags = true
        }
        /*
          Adds new tags to the todo
        */
        if (dataToUpdate.tags && dataToUpdate.tags.tagsToAdd) {
          todoTarget.Tags = [];
          for (const tagName of dataToUpdate.tags.tagsToAdd) {
            //Creates or finds Tags inside the Tag table
            let generatedTagResult = await Tag.findOrCreate({
              where: {
                name: tagName,
              },
              transaction: updateTodoTransaction,
            });

            //Stores each tag generated by the db
            todoTarget.Tags.push(generatedTagResult[0]);
          }
          //Populates the junction table TodoTag used for many-to-many relationship
          await todoTarget.addTags(todoTarget.Tags, {
            transaction: updateTodoTransaction,
          });
          updatedTags = true;
        }

        if (updatedTags) {
          //If there was tags updates, the returned updated todo will contain the tags.
           updatedTodo.Tags = await todoTarget.getTags({transaction: updateTodoTransaction});
        }
      }
    });
  } catch (error) {
    success = false;
    console.log("An error ocurred while updating the specified Todo entity");
  }
  return {success, data: updatedTodo}
}