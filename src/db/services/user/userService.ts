import { CreateUserDTO, UserDTO } from "../../../dtos/userDtos.js";
import { Result } from "../../../types/Result.js";
import * as userDal from "../../dal/userDal.js";
import { toUserDto } from "./userDtoMappers.js";

export const create = async (user: CreateUserDTO): Promise<Result<UserDTO | null>> => {
    const dbResult = await userDal.create(user);
    return {
        ...dbResult,
        data: dbResult.success ? toUserDto(dbResult.data!) : null,
    };
};