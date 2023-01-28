import { CreateUserDTO } from "../../dtos/userDtos.js";
import User from "../../models/User.js";
import { Result } from "../../types/Result.js";

export const create = async (user: CreateUserDTO): Promise<Result<User | null>> => {
  let createdUser: User | null = null;
  let success = true;

  try {
    createdUser = await User.create(user);
  } catch (error) {
    console.log("An error ocurred while creating the User entity");
    success = false;
  }

  return { success, data: createdUser };
};