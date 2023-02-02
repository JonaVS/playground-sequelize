import { TodoDTO } from "./todoDtos.js";

export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
};

export type UserDTO = Omit<CreateUserDTO, "password"> & {
  id: number;
  createdAt: Date;
};

export type UserLoginDTO = Omit<CreateUserDTO, "username">

export type AuthenticatedUserDTO = UserDTO & {
  jwt: string
}

export type UserWithTodosDTO = Partial<UserDTO> & {
  todos: TodoDTO[]
}