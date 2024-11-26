import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, fetchUsers } from "../api";
import { User } from "../types/database";
import { CreateUserRequest } from "../types/api";

export const useFetchUsers = () => {
  return useQuery<User[], Error>({ queryKey: ['users'], queryFn: fetchUsers });
}

export const useCreateUsers = () => {
  return useMutation<User, Error, CreateUserRequest>({ mutationFn: createUser })
}