import { AuthenticatedUserDTO, CreateUserDTO, UserDTO, UserLoginDTO, UserWithTodosDTO } from "../dtos/userDtos.js";
import { Result } from "../types/Result.js";
import * as userService from '../db/services/user/userService.js'

export const create = async(payload: CreateUserDTO): Promise<Result<UserDTO | null>> => {
    return await userService.create(payload);
}

export const login = async(payload: UserLoginDTO): Promise<Result<AuthenticatedUserDTO | null>> => {
    return await userService.login(payload);
}

export const getUsersAndTodos = async(): Promise<Result<UserWithTodosDTO[]>> => {
    return await userService.getUsersAndTodos();
}

export const getUserTodos = async(userId: number): Promise<Result<UserWithTodosDTO | null>> => {
    return await userService.getUserTodos(userId);
}