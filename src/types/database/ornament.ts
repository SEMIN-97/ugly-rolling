import { OrnamentType } from "../enum";

export interface Ornament {
  id: number;
  created_at: string;
  content: string;
  sweater_id: number;
  ornament_type: OrnamentType;
}