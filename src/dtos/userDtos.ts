export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
};

export type UserDTO = Omit<CreateUserDTO, "password"> & {
  id: number;
  createdAt: Date;
};