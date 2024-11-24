import { useQuery } from "@tanstack/react-query";
import { fetchSweaters } from "../api";
import { Sweater } from "../types/database";

export const useFetchSweaters = () => {
  return useQuery<Sweater[], Error>({ queryKey: ['sweaters'], queryFn: fetchSweaters });
}