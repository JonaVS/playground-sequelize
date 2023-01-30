import { AuthenticatedUserDTO, CreateUserDTO, UserDTO, UserLoginDTO } from "../../../dtos/userDtos.js";
import { Result } from "../../../types/Result.js";
import * as userDal from "../../dal/userDal.js";
import { toAuthenticatedUserDto, toUserDto } from "./userDtoMappers.js";
import { UserJwtPayload } from "../../../types/UserJwtPayload.js";
import jwt from "jsonwebtoken";

export const create = async (user: CreateUserDTO): Promise<Result<UserDTO | null>> => {
    const dbResult = await userDal.create(user);
    return {
        ...dbResult,
        data: dbResult.success ? toUserDto(dbResult.data!) : null,
    };
};


export const login = async (credentials: UserLoginDTO): Promise<Result<AuthenticatedUserDTO | null>> => {
    const dbResult = await userDal.login(credentials);
    let token = ""
    if (dbResult.success && dbResult.data) {
        const payload:UserJwtPayload = {
            id: dbResult.data.id,
            username: dbResult.data.username
        }
        token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '1h'});
    }

    return {...dbResult, data: dbResult.data ? toAuthenticatedUserDto(dbResult.data, token) : null }
}