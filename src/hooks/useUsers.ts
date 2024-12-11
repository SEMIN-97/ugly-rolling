import { useMutation } from "@tanstack/react-query";
import { createUser, updateUser } from "../api";
import { User } from "../types/database";
import { CreateUserRequest, UpdateUserRequest } from "../types/api";

export const useCreateUsers = () => {
  return useMutation<User, Error, CreateUserRequest>({ mutationFn: createUser });
};

export const useUpdateUser = () => {
  return useMutation<User, Error, { id: number, user: UpdateUserRequest }>({ mutationFn: updateUser });
}