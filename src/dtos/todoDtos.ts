import { TagDTO } from "./tagDtos.js";

//userId field is added via middleware if valid JWT.
export type CreateTodoDTO = {
  userId: number
  title: string;
  description: string;
  completed: boolean
  tags?: TagDTO[]
};

export type TodoDTO = CreateTodoDTO & {
  id: number;
  createdAt: Date,
  updatedAt: Date
};

//userId field is added via middleware if valid JWT.
export type UpdateTodoDTO = {
  userId: number
  todoData: Partial<Omit<CreateTodoDTO,"tags" | "userId">>,
  tags?: {
    tagsToRemove?: number[],
    tagsToAdd?: string[] 
  }
}