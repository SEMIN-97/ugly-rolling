import { OrnamentType, SweaterType } from "../enum";

export interface Ornament {
  id: number;
  created_at: string;
  content: string;
  sweaterType: SweaterType;
  ornamentType: OrnamentType;
}