import { supabase } from "./supabaseClient.ts";
import { Sweater } from "../types/database";

export const fetchSweaters = async (): Promise<Sweater[]> => {
  const { data, error } = await supabase.from('sweaters').select('*');
  if (error) throw new Error();
  return data;
}