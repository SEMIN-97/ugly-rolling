import { supabase } from "./supabaseClient.ts";
import { User } from "../types/database";
import { CreateUserRequest } from "../types/api";

const TABLE_NAME = 'users';

export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from(TABLE_NAME).select('*');
  if (error) throw new Error();
  return data;
};

export const createUser = async (user: CreateUserRequest): Promise<User> => {
  const { data, error } = await supabase.from(TABLE_NAME).insert(user).select().single();
  if (error) throw new Error(error.message);
  return data;
};