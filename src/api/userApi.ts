import { supabase } from "./supabaseClient.ts";
import { User } from "../types/database";
import { CreateUserRequest, UpdateUserRequest } from "../types/api";

const TABLE_NAME = 'users';

export const createUser = async (user: CreateUserRequest): Promise<User> => {
  const { data, error } = await supabase.from(TABLE_NAME).upsert(user, { onConflict: 'kakao_id' }).select().single();
  if (error) throw new Error(error.message);
  return data;
};

export const updateUser = async ({ id, user }: { id: number, user: UpdateUserRequest }): Promise<User> => {
  const { data, error } = await supabase.from(TABLE_NAME).update(user).eq('id', id).select().single();
  if (error) throw new Error(error.message);
  return data;
};