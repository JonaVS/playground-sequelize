import { CreateUserDTO, UserDTO } from "../dtos/userDtos.js";
import { Result } from "../types/Result.js";
import * as userService from '../db/services/user/userService.js'

export const create = async(payload: CreateUserDTO): Promise<Result<UserDTO | null>> => {
    return await userService.create(payload);
}