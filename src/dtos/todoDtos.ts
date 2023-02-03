//userId field is added via middleware if valid JWT.
export type CreateTodoDTO = {
  userId: number
  title: string;
  description: string;
  completed: boolean
};

export type TodoDTO = CreateTodoDTO & {
  id: number;
  createdAt: Date,
  updatedAt: Date
};

export type UpdateTodoDTO = Partial<CreateTodoDTO>;