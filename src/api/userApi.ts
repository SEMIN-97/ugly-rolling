import { supabase } from "./supabaseClient.ts";
import { User } from "../types/database";

const TABLE_NAME = 'users';

export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from(TABLE_NAME).select('*');
  if (error) throw new Error();
  return data;
};
