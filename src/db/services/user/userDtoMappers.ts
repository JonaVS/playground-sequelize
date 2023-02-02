import { AuthenticatedUserDTO, UserDTO, UserWithTodosDTO } from "../../../dtos/userDtos.js";
import User from "../../../models/User.js";
import { toTodoDto } from "../todo/todoDtoMappers.js";

export const toUserDto = (user: User): UserDTO => {
  const responseDTO: UserDTO = {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };
  return responseDTO;
};

export const toAuthenticatedUserDto = (user: User, jwt: string): AuthenticatedUserDTO => {
  const responseDTO: AuthenticatedUserDTO = {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    jwt: jwt
  };
  return responseDTO;
};

export const toUserWithTodosDto = (user: User): UserWithTodosDTO => {
  const responseDTO: UserWithTodosDTO = {
    id: user.id,
    username: user.username,
    todos: user.Todos ? user.Todos.map(toTodoDto) : []
  }

  return responseDTO
}