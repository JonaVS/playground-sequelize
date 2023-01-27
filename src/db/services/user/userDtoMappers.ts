import { UserDTO } from "../../../dtos/userDtos.js";
import User from "../../../models/User.js";

export const toUserDto = (user: User): UserDTO => {
  const responseDTO: UserDTO = {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };
  return responseDTO;
};