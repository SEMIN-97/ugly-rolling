import { SweaterType } from "../enum";

export interface Sweater {
  id: number;
  created_at: string;
  updated_at: string;
  user: string;
  ornaments: number[];
  description: string;
  sweaterType: SweaterType;
}