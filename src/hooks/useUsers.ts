import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, fetchUserByKakaoId, updateUser } from "../api";
import { User } from "../types/database";
import { CreateUserRequest, UpdateUserRequest } from "../types/api";

export const useFetchUsers = (kakaoId: number) => {
  return useQuery<User | null, Error>({
    queryKey: ['user', kakaoId],
    queryFn: ({ queryKey }) => {
      const [_key, id] = queryKey;
      return fetchUserByKakaoId(id as number);
    }
  });
};

export const useCreateUsers = () => {
  return useMutation<User, Error, CreateUserRequest>({ mutationFn: createUser });
};

export const useUpdateUser = () => {
  return useMutation<User, Error, { id: number, user: UpdateUserRequest }>({ mutationFn: updateUser });
}