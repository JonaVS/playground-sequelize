export type CreateTodoDTO = {
  title: string;
  description: string;
};

export type TodoDTO = CreateTodoDTO & {
  id: number;
};
