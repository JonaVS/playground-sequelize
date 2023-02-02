import { CreateUserDTO, UserLoginDTO } from "../../dtos/userDtos.js";
import User from "../../models/User.js";
import { Result } from "../../types/Result.js";
import bcrypt from "bcrypt";
import Todo from "../../models/Todo.js";

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

export const login = async (credentials: UserLoginDTO): Promise<Result<User | null>> => {
  let user: User | null = null;
  let success = true;
  let isValidPassword = false

  try {
    user = await User.findOne({where: {email: credentials.email} })
    if (user) {
      isValidPassword =  await bcrypt.compare(credentials.password, user.password)
    }
  } catch (error) {
    console.log("An error ocurred while validating login credentials");
    success = false
  }

  return {success, data: isValidPassword ? user : null }
}

/*
  This DB call is just to test eager loading of a model with relations/associations
  In this case I just want to get all users with their created todos.
*/
export const getUsersAndTodos = async (): Promise<Result<User[]>> => {
  let users: User[] = []
  let success = true;

  try {
    users = await User.findAll({include: Todo})
  } catch (error) {
    console.log("An error ocurred while fetching the users");
    success = false
  }

  return {success, data: users}
}